import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface CarreraResponseDto {
  id: number;
  nombre: string;
}

export interface CarreraRequestDto {
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CarreraService {
  private api = `${environment.apiUrl}/carreras`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<CarreraResponseDto[]> {
    return this.http
      .get<{ data: CarreraResponseDto[] }>(this.api)
      .pipe(map(res => res.data));
  }

  create(dto: CarreraRequestDto): Observable<CarreraResponseDto> {
    return this.http.post<CarreraResponseDto>(this.api, dto);
  }

  findById(id: number): Observable<CarreraResponseDto> {
    return this.http
      .get<{ data: CarreraResponseDto }>(`${this.api}/${id}`)
      .pipe(map(res => res.data));
  }

  update(id: number, dto: CarreraRequestDto): Observable<CarreraResponseDto> {
    return this.http.put<CarreraResponseDto>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
