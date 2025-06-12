import { Component, OnInit } from '@angular/core';
import { CursoService, CursoResponseDto } from './curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html'
})
export class CursoListComponent implements OnInit {
  cursos: CursoResponseDto[] = [];
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'id' | 'anioCursado' | 'division' | 'anioAcademico' = 'id';
  sortAsc = true;

  constructor(private cursoService: CursoService) {}

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.cursoService.findAll().subscribe(cursos => {
      this.cursos = cursos;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('cursoDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.cursoService.delete(this.deleteId).subscribe({
      next: () => {
        this.getCursos();
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

  sort(field: 'id' | 'anioCursado' | 'division' | 'anioAcademico') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.cursos.sort((a: any, b: any) => {
      let aValue: any;
      let bValue: any;
      if (this.sortKey === 'anioAcademico') {
        aValue = a.anioAcademico?.anio || 0;
        bValue = b.anioAcademico?.anio || 0;
      } else {
        aValue = a[this.sortKey];
        bValue = b[this.sortKey];
      }
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
