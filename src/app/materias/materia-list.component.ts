import { Component, OnInit } from '@angular/core';
import { MateriaService, MateriaResponseDto } from './materia.service';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.component.html'
})
export class MateriaListComponent implements OnInit {
  materias: MateriaResponseDto[] = [];
  deleteId?: number;
  modal: any;
  sortKey: 'id' | 'nombre' | 'carrera' = 'id';
  sortAsc = true;

  constructor(private materiaService: MateriaService) {}

  ngOnInit() {
    this.getMaterias();
  }

  getMaterias() {
    this.materiaService.findAll().subscribe(materias => {
      this.materias = materias;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('materiaDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.materiaService.delete(this.deleteId).subscribe(() => {
      this.getMaterias();
      if (this.modal) {
        this.modal.hide();
      }
    });
  }

  sort(field: 'id' | 'nombre' | 'carrera') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.materias.sort((a: any, b: any) => {
      let aValue: any;
      let bValue: any;
      if (this.sortKey === 'carrera') {
        aValue = a.carrera?.nombre || '';
        bValue = b.carrera?.nombre || '';
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
