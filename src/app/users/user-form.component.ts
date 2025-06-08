import { Component, EventEmitter, Output } from '@angular/core';
import { UserService, UserRequestDto, GroupResponseDto } from './user.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  @Output() refresh = new EventEmitter<void>();

  dto: UserRequestDto = { username: '', password: '', groupId: 0 };
  groups: GroupResponseDto[] = [];

  constructor(private userService: UserService, private groupService: GroupService) {
    this.groupService.findAll().subscribe(groups => this.groups = groups);
  }

  submit() {
    this.userService.create(this.dto).subscribe(() => {
      this.dto = { username: '', password: '', groupId: 0 };
      this.refresh.emit();
    });
  }
}
