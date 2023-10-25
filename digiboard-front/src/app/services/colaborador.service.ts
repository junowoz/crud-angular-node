// colaborador.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Traz todos os colaboradores
  fetchColaboradores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/colaboradores`);
  }

  fetchColaboradoresBySetor(setor: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/colaboradores/setor/${setor}`);
  }

  fetchColaboradoresByCargo(cargo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/colaboradores/cargo/${cargo}`);
  }

  addColaborador(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/colaboradores`, data).pipe(
      tap(() => this.fetchColaboradores()) // após adicionar, buscamos novamente a lista de colaboradores
    );
  }

  deleteColaborador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/colaboradores/${id}`).pipe(
      tap(() => this.fetchColaboradores()) // após deletar, buscamos novamente a lista de colaboradores
    );
  }

  updateColaborador(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/colaboradores/${id}`, data).pipe(
      tap(() => this.fetchColaboradores()) // após atualizar, buscamos novamente a lista de colaboradores
    );
  }
}
