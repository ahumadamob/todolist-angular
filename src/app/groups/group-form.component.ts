import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService, GroupRequestDto } from './group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html'
})
export class GroupFormComponent {
  dto: GroupRequestDto = { name: '' };
  errors: Record<string, string> = {};

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.groupService.findById(+id).subscribe(group => {
        this.dto = { name: group.name };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.groupService.update(this.editId, this.dto)
      : this.groupService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/groups']);
      },
      error: err => {
        const detail = err.error?.detail;
        if (detail?.field) {
          this.errors[detail.field] = detail.value;
        }
      }
    });
  }
}
