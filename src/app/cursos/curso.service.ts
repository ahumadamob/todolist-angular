import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnioAcademicoResponseDto } from '../anios-academicos/anio-academico.service';

export interface CursoResponseDto {
  id: number;
  anioCursado: number;
  division: string;
  anioAcademico: AnioAcademicoResponseDto;
}

export interface CursoRequestDto {
  anioCursado?: number;
  division: string;
  anioAcademicoId: number;
}

@Injectable({ providedIn: 'root' })
export class CursoService {
  private api = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<CursoResponseDto[]> {
    return this.http
      .get<{ data: CursoResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  findById(id: number): Observable<CursoResponseDto> {
    return this.http
      .get<{ data: CursoResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  create(dto: CursoRequestDto): Observable<CursoResponseDto> {
    return this.http.post<CursoResponseDto>(this.api, dto);
  }

  update(id: number, dto: CursoRequestDto): Observable<CursoResponseDto> {
    return this.http.put<CursoResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
