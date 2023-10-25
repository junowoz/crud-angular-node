// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router'; // Import CanActivateFn instead of CanActivate
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    // Update to CanActivateFn
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };
}
