import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  InscripcionAlumnoMateriaService,
  InscripcionAlumnoMateriaRequestDto,
  InscripcionAlumnoMateriaResponseDto
} from './inscripcion-alumno-materia.service';
import { AlumnoService, AlumnoResponseDto } from '../alumnos/alumno.service';

@Component({
  selector: 'app-inscripcion-alumno-materia-form',
  templateUrl: './inscripcion-alumno-materia-form.component.html'
})
export class InscripcionAlumnoMateriaFormComponent {
  cursoMateriaId = 0;
  inscripciones: InscripcionAlumnoMateriaResponseDto[] = [];
  alumnos: AlumnoResponseDto[] = [];
  filteredAlumnos: AlumnoResponseDto[] = [];
  searchText = '';
  selectedAlumno?: AlumnoResponseDto;
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'apellido' | 'nombre' | 'matricula' = 'apellido';
  sortAsc = false;

  constructor(
    private route: ActivatedRoute,
    private inscripcionService: InscripcionAlumnoMateriaService,
    private alumnoService: AlumnoService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoMateriaId = +id;
      this.loadInscripciones();
    }
    this.alumnoService.findAll().subscribe(a => {
      this.alumnos = a;
      this.filteredAlumnos = a;
    });
  }

  loadInscripciones() {
    this.inscripcionService
      .findByCursoMateria(this.cursoMateriaId)
      .subscribe(i => {
        this.inscripciones = i;
        this.applySort();
      });
  }

  onSearchChange() {
    const term = this.searchText.toLowerCase();
    this.filteredAlumnos = this.alumnos.filter(a =>
      `${a.nombre} ${a.apellido}`.toLowerCase().includes(term)
    );
    this.selectedAlumno = undefined;
  }

  selectAlumno(alumno: AlumnoResponseDto) {
    this.searchText = `${alumno.nombre} ${alumno.apellido}`;
    this.selectedAlumno = alumno;
    this.filteredAlumnos = [];
  }

  addInscripcion() {
    if (!this.selectedAlumno) {
      const found = this.alumnos.find(
        a => `${a.nombre} ${a.apellido}`.toLowerCase() === this.searchText.toLowerCase()
      );
      if (found) {
        this.selectedAlumno = found;
      } else {
        return;
      }
    }
    const dto: InscripcionAlumnoMateriaRequestDto = {
      alumnoId: this.selectedAlumno.id,
      cursoMateriaId: this.cursoMateriaId
    };
    this.inscripcionService.create(dto).subscribe(ins => {
      this.inscripciones.push(ins);
      this.searchText = '';
      this.selectedAlumno = undefined;
      this.filteredAlumnos = this.alumnos;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('inscripcionDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.inscripcionService.delete(this.deleteId).subscribe({
      next: () => {
        this.loadInscripciones();
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

  sort(field: 'apellido' | 'nombre' | 'matricula') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.inscripciones.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      if (this.sortKey === 'apellido') {
        aValue = a.alumno.apellido;
        bValue = b.alumno.apellido;
      } else if (this.sortKey === 'nombre') {
        aValue = a.alumno.nombre;
        bValue = b.alumno.nombre;
      } else {
        aValue = a.alumno.id;
        bValue = b.alumno.id;
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
