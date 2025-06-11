import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AlumnoResponseDto {
  id: number;
  nombre: string;
  apellido: string;
  fotoPerfil: string;
}

export interface AlumnoRequestDto {
  nombre: string;
  apellido: string;
  fotoPerfil: string;
}

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private api = `${environment.apiUrl}/alumnos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<AlumnoResponseDto[]> {
    return this.http
      .get<{ data: AlumnoResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  findById(id: number): Observable<AlumnoResponseDto> {
    return this.http
      .get<{ data: AlumnoResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  create(dto: AlumnoRequestDto): Observable<AlumnoResponseDto> {
    return this.http.post<AlumnoResponseDto>(this.api, dto);
  }

  update(id: number, dto: AlumnoRequestDto): Observable<AlumnoResponseDto> {
    return this.http.put<AlumnoResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
