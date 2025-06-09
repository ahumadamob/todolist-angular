import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface MateriaRefDto {
  id: number;
  nombre: string;
}

export interface CarreraResponseDto {
  id: number;
  nombre: string;
}

export interface MateriaResponseDto {
  id: number;
  nombre: string;
  carrera: CarreraResponseDto;
  correlativas: MateriaRefDto[];
}

export interface MateriaRequestDto {
  nombre: string;
  carreraId: number;
  correlativaIds: number[];
}

@Injectable({ providedIn: 'root' })
export class MateriaService {
  private api = `${environment.apiUrl}/materias`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<MateriaResponseDto[]> {
    return this.http
      .get<{ data: MateriaResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  findById(id: number): Observable<MateriaResponseDto> {
    return this.http
      .get<{ data: MateriaResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  create(dto: MateriaRequestDto): Observable<MateriaResponseDto> {
    return this.http.post<MateriaResponseDto>(this.api, dto);
  }

  update(id: number, dto: MateriaRequestDto): Observable<MateriaResponseDto> {
    return this.http.put<MateriaResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
