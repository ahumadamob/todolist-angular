import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRequestDto, GroupResponseDto } from './user.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  dto: UserRequestDto = { username: '', password: '', groupId: 0 };
  groups: GroupResponseDto[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.groupService.findAll().subscribe(groups => (this.groups = groups));
  }

  submit() {
    this.userService.create(this.dto).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
