import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MateriaResponseDto } from '../materias/materia.service';

export interface CursoMateriaResponseDto {
  id: number;
  materia: MateriaResponseDto;
}

export interface CursoMateriaRequestDto {
  cursoId: number;
  materiaId: number;
}

@Injectable({ providedIn: 'root' })
export class CursoMateriaService {
  private api = `${environment.apiUrl}/curso-materias`;

  constructor(private http: HttpClient) {}

  findByCurso(cursoId: number): Observable<CursoMateriaResponseDto[]> {
    return this.http
      .get<{ data: CursoMateriaResponseDto[] }>(`${this.api}?cursoId=${cursoId}`)
      .pipe(map(res => res.data));
  }

  create(dto: CursoMateriaRequestDto): Observable<CursoMateriaResponseDto> {
    return this.http
      .post<{ data: CursoMateriaResponseDto }>(this.api, dto)
      .pipe(map(res => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
