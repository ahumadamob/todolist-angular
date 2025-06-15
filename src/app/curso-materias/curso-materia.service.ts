import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MateriaResponseDto } from '../materias/materia.service';
import { ProfesorResponseDto } from '../profesores/profesor.service';
import { CursoResponseDto } from '../cursos/curso.service';

export interface AulaResponseDto {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
}

export interface ModalidadResponseDto {
  id: number;
  nombre: string;
}

export interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface ModuloHoraResponseDto {
  id: number;
  nombre: string;
  horaInicio: LocalTime;
  horaFin: LocalTime;
}

export interface CursoMateriaResponseDto {
  id: number;
  curso: CursoResponseDto;
  materia: MateriaResponseDto;
  profesor: ProfesorResponseDto;
  aula: AulaResponseDto;
  diasSemana: string[];
  moduloHora: ModuloHoraResponseDto;
  modalidad: ModalidadResponseDto;
}

export interface CursoMateriaRequestDto {
  cursoId: number;
  materiaId: number;
  profesorId?: number;
  aulaId?: number;
  diasSemana?: string[];
  moduloHoraId?: number;
  modalidadId?: number;
}

@Injectable({ providedIn: 'root' })
export class CursoMateriaService {
  private api = `${environment.apiUrl}/cursos-materia`;

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

  update(id: number, dto: CursoMateriaRequestDto): Observable<CursoMateriaResponseDto> {
    return this.http
      .put<{ data: CursoMateriaResponseDto }>(`${this.api}/${id}`, dto)
      .pipe(map(res => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
