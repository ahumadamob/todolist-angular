import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService, GroupRequestDto } from './group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html'
})
export class GroupFormComponent {
  dto: GroupRequestDto = { name: '' };

  constructor(private groupService: GroupService, private router: Router) {}

  submit() {
    this.groupService.create(this.dto).subscribe(() => {
      this.router.navigate(['/groups']);
    });
  }
}
