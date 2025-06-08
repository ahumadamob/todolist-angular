import { Component, OnInit } from '@angular/core';
import { UserService, UserResponseDto } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: UserResponseDto[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.findAll().subscribe(users => this.users = users);
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(() => this.getUsers());
  }
}
