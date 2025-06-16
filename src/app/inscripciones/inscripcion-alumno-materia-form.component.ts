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
      .subscribe(i => (this.inscripciones = i));
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
    });
  }
}
