import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AnioAcademicoResponseDto {
  id: number;
  anio: number;
  activo: boolean;
}

export interface AnioAcademicoRequestDto {
  anio: number;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class AnioAcademicoService {
  private api = `${environment.apiUrl}/anios-academicos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<AnioAcademicoResponseDto[]> {
    return this.http
      .get<{ data: AnioAcademicoResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  create(dto: AnioAcademicoRequestDto): Observable<AnioAcademicoResponseDto> {
    return this.http.post<AnioAcademicoResponseDto>(this.api, dto);
  }

  findById(id: number): Observable<AnioAcademicoResponseDto> {
    return this.http
      .get<{ data: AnioAcademicoResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  update(id: number, dto: AnioAcademicoRequestDto): Observable<AnioAcademicoResponseDto> {
    return this.http.put<AnioAcademicoResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

