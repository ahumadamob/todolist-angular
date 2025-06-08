import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserResponseDto {
  id: number;
  username: string;
  group: GroupResponseDto;
}

export interface GroupResponseDto {
  id: number;
  name: string;
}

export interface UserRequestDto {
  username: string;
  password: string;
  groupId: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<UserResponseDto[]> {
    return this.http.get<{ data: UserResponseDto[] }>(this.api).pipe(map(res => res.data));
  }

  findById(id: number): Observable<UserResponseDto> {
    return this.http.get<{ data: UserResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  create(dto: UserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(this.api, dto);
  }

  update(id: number, dto: UserRequestDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
