//auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //url do backend e chave do token
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  //método de login
  login(senha: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { senha })
      .pipe(
        tap((response) => {
          //salvando o token no localStorage
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  //método de logout
  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  //método para pegar o token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }
}
