import { Component, EventEmitter, Output } from '@angular/core';
import { GroupService, GroupRequestDto } from './group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html'
})
export class GroupFormComponent {
  @Output() refresh = new EventEmitter<void>();
  dto: GroupRequestDto = { name: '' };

  constructor(private groupService: GroupService) {}

  submit() {
    this.groupService.create(this.dto).subscribe(() => {
      this.dto = { name: '' };
      this.refresh.emit();
    });
  }
}
