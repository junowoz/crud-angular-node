// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (this.authService.isAuthenticated()) {
      // Se o usuário estiver autenticado, permita o acesso à rota
      return true;
    } else {
      // Se não, redirecione para a página inicial
      this.router.navigate(['/']);
      return false;
    }
  };
}
