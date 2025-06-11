import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnioAcademicoService, AnioAcademicoRequestDto } from './anio-academico.service';

@Component({
  selector: 'app-anio-academico-form',
  templateUrl: './anio-academico-form.component.html'
})
export class AnioAcademicoFormComponent {
  dto: AnioAcademicoRequestDto = { anio: new Date().getFullYear(), activo: false };
  errors: Record<string, string> = {};

  constructor(
    private anioService: AnioAcademicoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.anioService.findById(+id).subscribe(anio => {
        this.dto = { anio: anio.anio, activo: anio.activo };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.anioService.update(this.editId, this.dto)
      : this.anioService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/anios-academicos']);
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

