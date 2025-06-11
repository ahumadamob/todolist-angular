import { Component, OnInit } from '@angular/core';
import { AlumnoService, AlumnoResponseDto } from './alumno.service';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html'
})
export class AlumnoListComponent implements OnInit {
  alumnos: AlumnoResponseDto[] = [];
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'id' | 'nombre' | 'apellido' = 'id';
  sortAsc = true;

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.alumnoService.findAll().subscribe(alumnos => {
      this.alumnos = alumnos;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('alumnoDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.alumnoService.delete(this.deleteId).subscribe({
      next: () => {
        this.getAlumnos();
        if (this.modal) {
          this.modal.hide();
        }
      },
      error: err => {
        if (err.status === 409) {
          if (this.modal) {
            this.modal.hide();
          }
          const backendMsg = typeof err.error === 'string' ? err.error : err.error?.message;
          this.errorMessage = backendMsg || 'No se puede eliminar el registro';
        }
      }
    });
  }

  sort(field: 'id' | 'nombre' | 'apellido') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.alumnos.sort((a: any, b: any) => {
      const aValue = a[this.sortKey];
      const bValue = b[this.sortKey];
      if (aValue < bValue) {
        return this.sortAsc ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortAsc ? 1 : -1;
      }
      return 0;
    });
  }
}
