import { Component, OnInit } from '@angular/core';
import { AnioAcademicoService, AnioAcademicoResponseDto } from './anio-academico.service';

@Component({
  selector: 'app-anio-academico-list',
  templateUrl: './anio-academico-list.component.html'
})
export class AnioAcademicoListComponent implements OnInit {
  anios: AnioAcademicoResponseDto[] = [];
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'id' | 'anio' | 'activo' = 'id';
  sortAsc = true;

  constructor(private anioService: AnioAcademicoService) {}

  ngOnInit() {
    this.getAnios();
  }

  getAnios() {
    this.anioService.findAll().subscribe(anios => {
      this.anios = anios;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('anioAcademicoDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.anioService.delete(this.deleteId).subscribe({
      next: () => {
        this.getAnios();
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

  sort(field: 'id' | 'anio' | 'activo') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.anios.sort((a: any, b: any) => {
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

