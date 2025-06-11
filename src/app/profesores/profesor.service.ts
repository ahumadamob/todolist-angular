import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ProfesorResponseDto {
  id: number;
  nombre: string;
  apellido: string;
  fotoPerfil: string;
}

export interface ProfesorRequestDto {
  nombre: string;
  apellido: string;
  fotoPerfil: string;
}

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private api = `${environment.apiUrl}/profesores`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<ProfesorResponseDto[]> {
    return this.http
      .get<{ data: ProfesorResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  findById(id: number): Observable<ProfesorResponseDto> {
    return this.http
      .get<{ data: ProfesorResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  create(dto: ProfesorRequestDto): Observable<ProfesorResponseDto> {
    return this.http.post<ProfesorResponseDto>(this.api, dto);
  }

  update(id: number, dto: ProfesorRequestDto): Observable<ProfesorResponseDto> {
    return this.http.put<ProfesorResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
