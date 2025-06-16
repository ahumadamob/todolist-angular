import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlumnoResponseDto } from '../alumnos/alumno.service';
import { CursoMateriaResponseDto } from '../curso-materias/curso-materia.service';

export interface InscripcionAlumnoMateriaResponseDto {
  id: number;
  alumno: AlumnoResponseDto;
  cursoMateria: CursoMateriaResponseDto;
  fechaInscripcion: string;
  estado: string;
}

export interface InscripcionAlumnoMateriaRequestDto {
  alumnoId: number;
  cursoMateriaId: number;
  fechaInscripcion?: string;
  estado?: string;
}

@Injectable({ providedIn: 'root' })
export class InscripcionAlumnoMateriaService {
  private api = `${environment.apiUrl}/inscripciones`;

  constructor(private http: HttpClient) {}

  findByCursoMateria(cursoMateriaId: number): Observable<InscripcionAlumnoMateriaResponseDto[]> {
    return this.http
      .get<{ data: InscripcionAlumnoMateriaResponseDto[] }>(`${this.api}?cursoMateriaId=${cursoMateriaId}`)
      .pipe(map(res => res.data));
  }

  create(dto: InscripcionAlumnoMateriaRequestDto): Observable<InscripcionAlumnoMateriaResponseDto> {
    return this.http
      .post<{ data: InscripcionAlumnoMateriaResponseDto }>(this.api, dto)
      .pipe(map(res => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
