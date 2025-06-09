import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarreraService, CarreraRequestDto } from './carrera.service';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html'
})
export class CarreraFormComponent {
  dto: CarreraRequestDto = { nombre: '' };
  errors: Record<string, string> = {};

  constructor(
    private carreraService: CarreraService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carreraService.findById(+id).subscribe(carrera => {
        this.dto = { nombre: carrera.nombre };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.carreraService.update(this.editId, this.dto)
      : this.carreraService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/carreras']);
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
