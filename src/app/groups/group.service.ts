import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface GroupResponseDto {
  id: number;
  name: string;
}

export interface GroupRequestDto {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class GroupService {
  private api = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<GroupResponseDto[]> {
    return this.http.get<{ data: GroupResponseDto[] }>(this.api).pipe(map(res => res.data));
  }

  create(dto: GroupRequestDto): Observable<GroupResponseDto> {
    return this.http.post<GroupResponseDto>(this.api, dto);
  }

  findById(id: number): Observable<GroupResponseDto> {
    return this.http.get<GroupResponseDto>(`${this.api}/${id}`);
  }

  update(id: number, dto: GroupRequestDto): Observable<GroupResponseDto> {
    return this.http.put<GroupResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
