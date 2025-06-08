import { Component, OnInit } from '@angular/core';
import { GroupService, GroupResponseDto } from './group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {
  groups: GroupResponseDto[] = [];
  deleteId?: number;
  modal: any;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupService.findAll().subscribe(groups => this.groups = groups);
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('groupDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.groupService.delete(this.deleteId).subscribe(() => {
      this.getGroups();
      if (this.modal) {
        this.modal.hide();
      }
    });
  }
}
