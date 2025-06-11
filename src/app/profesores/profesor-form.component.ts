import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfesorService, ProfesorRequestDto } from './profesor.service';

@Component({
  selector: 'app-profesor-form',
  templateUrl: './profesor-form.component.html'
})
export class ProfesorFormComponent {
  dto: ProfesorRequestDto = { nombre: '', apellido: '', fotoPerfil: '' };
  errors: Record<string, string> = {};

  constructor(
    private profesorService: ProfesorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profesorService.findById(+id).subscribe(profesor => {
        this.dto = {
          nombre: profesor.nombre,
          apellido: profesor.apellido,
          fotoPerfil: profesor.fotoPerfil
        };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.profesorService.update(this.editId, this.dto)
      : this.profesorService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/profesores']);
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
