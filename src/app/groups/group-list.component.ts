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
  errorMessage = '';
  sortKey: 'id' | 'name' = 'id';
  sortAsc = true;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupService.findAll().subscribe(groups => {
      this.groups = groups;
      this.applySort();
    });
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
    this.groupService.delete(this.deleteId).subscribe({
      next: () => {
        this.getGroups();
        if (this.modal) {
          this.modal.hide();
        }
      },
      error: err => {
        if (err.status === 409) {
          if (this.modal) {
            this.modal.hide();
          }
          const backendMsg = typeof err.error === 'string' ? err.error : err.error?.message;
          this.errorMessage = backendMsg || 'No se puede eliminar el registro';
        }
      }
    });
  }

  sort(field: 'id' | 'name') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.groups.sort((a: any, b: any) => {
      const aValue = a[this.sortKey];
      const bValue = b[this.sortKey];
      if (aValue < bValue) {
        return this.sortAsc ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortAsc ? 1 : -1;
      }
      return 0;
    });
  }
}
