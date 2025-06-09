import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriaService, MateriaRequestDto, MateriaResponseDto } from './materia.service';
import { CarreraService, CarreraResponseDto } from '../carreras/carrera.service';

@Component({
  selector: 'app-materia-form',
  templateUrl: './materia-form.component.html'
})
export class MateriaFormComponent {
  dto: MateriaRequestDto = { nombre: '', carreraId: 0, correlativaIds: [] };
  carreras: CarreraResponseDto[] = [];
  materias: MateriaResponseDto[] = [];
  errors: Record<string, string> = {};

  constructor(
    private materiaService: MateriaService,
    private carreraService: CarreraService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.carreraService.findAll().subscribe(c => (this.carreras = c));
    this.materiaService.findAll().subscribe(m => (this.materias = m));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.materiaService.findById(+id).subscribe(mat => {
        this.dto = {
          nombre: mat.nombre,
          carreraId: mat.carrera.id,
          correlativaIds: mat.correlativas.map(c => c.id)
        };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.materiaService.update(this.editId, this.dto)
      : this.materiaService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/materias']);
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
}
