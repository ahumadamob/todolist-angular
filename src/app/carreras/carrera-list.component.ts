import { Component, OnInit } from '@angular/core';
import { CarreraService, CarreraResponseDto } from './carrera.service';

@Component({
  selector: 'app-carrera-list',
  templateUrl: './carrera-list.component.html'
})
export class CarreraListComponent implements OnInit {
  carreras: CarreraResponseDto[] = [];
  deleteId?: number;
  modal: any;
  sortKey: 'id' | 'nombre' = 'id';
  sortAsc = true;

  constructor(private carreraService: CarreraService) {}

  ngOnInit() {
    this.getCarreras();
  }

  getCarreras() {
    this.carreraService.findAll().subscribe(carreras => {
      this.carreras = carreras;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('carreraDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.carreraService.delete(this.deleteId).subscribe(() => {
      this.getCarreras();
      if (this.modal) {
        this.modal.hide();
      }
    });
  }

  sort(field: 'id' | 'nombre') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.carreras.sort((a: any, b: any) => {
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
