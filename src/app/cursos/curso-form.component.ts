import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService, CursoRequestDto } from './curso.service';
import {
  AnioAcademicoService,
  AnioAcademicoResponseDto
} from '../anios-academicos/anio-academico.service';
import {
  MateriaService,
  MateriaResponseDto
} from '../materias/materia.service';
import {
  CursoMateriaService,
  CursoMateriaResponseDto,
  CursoMateriaRequestDto
} from '../curso-materias/curso-materia.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html'
})
export class CursoFormComponent {
  dto: CursoRequestDto = { anioCursado: undefined, division: '', anioAcademicoId: 0 };
  anios: AnioAcademicoResponseDto[] = [];
  materias: MateriaResponseDto[] = [];
  cursoMaterias: CursoMateriaResponseDto[] = [];
  materiaId = 0;
  errors: Record<string, string> = {};

  constructor(
    private cursoService: CursoService,
    private anioService: AnioAcademicoService,
    private materiaService: MateriaService,
    private cursoMateriaService: CursoMateriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.anioService.findAll().subscribe(a => (this.anios = a));
    this.materiaService.findAll().subscribe(m => (this.materias = m));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.findById(+id).subscribe(curso => {
        this.dto = {
          anioCursado: curso.anioCursado,
          division: curso.division,
          anioAcademicoId: curso.anioAcademico.id
        };
        this.editId = +id;
        this.loadCursoMaterias();
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.cursoService.update(this.editId, this.dto)
      : this.cursoService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/cursos']);
      },
      error: err => {
        const detail = err.error?.detail;
        const messages = detail?.messages || err.error?.messages;
        if (Array.isArray(messages)) {
          for (const m of messages) {
            if (m.field) {
              this.errors[m.field] = m.value;
            }
          }
        } else if (detail?.field) {
          this.errors[detail.field] = detail.value;
        }
      }
    });
  }

  private loadCursoMaterias() {
    if (!this.editId) {
      return;
    }
    this.cursoMateriaService
      .findByCurso(this.editId)
      .subscribe(cm => (this.cursoMaterias = cm));
  }

  addCursoMateria() {
    if (!this.editId || !this.materiaId) {
      return;
    }
    const dto: CursoMateriaRequestDto = {
      cursoId: this.editId,
      materiaId: this.materiaId
    };
    this.cursoMateriaService.create(dto).subscribe(cm => {
      this.cursoMaterias.push(cm);
      this.materiaId = 0;
    });
  }

  removeCursoMateria(id: number) {
    this.cursoMateriaService.delete(id).subscribe(() => {
      this.cursoMaterias = this.cursoMaterias.filter(cm => cm.id !== id);
    });
  }
}
