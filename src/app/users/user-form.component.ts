import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, UserRequestDto, GroupResponseDto } from './user.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  dto: UserRequestDto = { username: '', password: '', groupId: 0 };
  groups: GroupResponseDto[] = [];
  errors: Record<string, string> = {};

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupService.findAll().subscribe(groups => (this.groups = groups));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.findById(+id).subscribe(user => {
        this.dto = { username: user.username, password: '', groupId: user.group.id };
        this.editId = +id;
      });
    }
  }

  editId?: number;

  submit() {
    this.errors = {};
    const request = this.editId
      ? this.userService.update(this.editId, this.dto)
      : this.userService.create(this.dto);
    request.subscribe({
      next: () => {
        this.router.navigate(['/users']);
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
