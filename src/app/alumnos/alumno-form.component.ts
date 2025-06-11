import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService, AlumnoRequestDto } from './alumno.service';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html'
})
export class AlumnoFormComponent {
  dto: AlumnoRequestDto = { nombre: '', apellido: '', fotoPerfil: '' };
  errors: Record<string, string> = {};

  constructor(
    private alumnoService: AlumnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumnoService.findById(+id).subscribe(alumno => {
        this.dto = {
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          fotoPerfil: alumno.fotoPerfil
        };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.alumnoService.update(this.editId, this.dto)
      : this.alumnoService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/alumnos']);
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
