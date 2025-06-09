import { Component, OnInit } from '@angular/core';
import { UserService, UserResponseDto } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: UserResponseDto[] = [];
  deleteId?: number;
  modal: any;
  errorMessage = '';
  sortKey: 'id' | 'username' | 'group' = 'id';
  sortAsc = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.findAll().subscribe(users => {
      this.users = users;
      this.applySort();
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    const el = document.getElementById('userDeleteModal');
    if (el) {
      this.modal = new (window as any).bootstrap.Modal(el);
      this.modal.show();
    }
  }

  deleteConfirmed() {
    if (!this.deleteId) {
      return;
    }
    this.userService.delete(this.deleteId).subscribe({
      next: () => {
        this.getUsers();
        if (this.modal) {
          this.modal.hide();
        }
      },
      error: err => {
        if (err.status === 409) {
          if (this.modal) {
            this.modal.hide();
          }
          this.errorMessage = err.error?.message || 'No se puede eliminar el registro';
        }
      }
    });
  }

  sort(field: 'id' | 'username' | 'group') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }
    this.applySort();
  }

  private applySort() {
    this.users.sort((a: any, b: any) => {
      let aValue: any;
      let bValue: any;
      if (this.sortKey === 'group') {
        aValue = a.group?.name || '';
        bValue = b.group?.name || '';
      } else {
        aValue = a[this.sortKey];
        bValue = b[this.sortKey];
      }
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
