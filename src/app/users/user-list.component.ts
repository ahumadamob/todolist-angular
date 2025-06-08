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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.findAll().subscribe(users => this.users = users);
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
    this.userService.delete(this.deleteId).subscribe(() => {
      this.getUsers();
      if (this.modal) {
        this.modal.hide();
      }
    });
  }
}
