import { Component, OnInit } from '@angular/core';
import { ProfesorService, ProfesorResponseDto } from './profesor.service';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html'
})
export class ProfesorListComponent implements OnInit {
  profesores: ProfesorResponseDto[] = [];
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'id' | 'nombre' | 'apellido' = 'id';
  sortAsc = true;

  constructor(private profesorService: ProfesorService) {}

  ngOnInit() {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.findAll().subscribe(profesores => {
      this.profesores = profesores;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('profesorDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.profesorService.delete(this.deleteId).subscribe({
      next: () => {
        this.getProfesores();
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
    this.profesores.sort((a: any, b: any) => {
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
