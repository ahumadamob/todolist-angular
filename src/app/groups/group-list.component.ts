import { Component, OnInit } from '@angular/core';
import { GroupService, GroupResponseDto } from './group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {
  groups: GroupResponseDto[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupService.findAll().subscribe(groups => this.groups = groups);
  }

  delete(id: number) {
    this.groupService.delete(id).subscribe(() => this.getGroups());
  }
}
