//login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  senha: string = ''; // Modelo para armazenar a senha digitada pelo usuário.
  showErrorMessage: boolean = false; // Indicador se a mensagem de erro deve ser exibida.

  constructor(private authService: AuthService, private router: Router) {}

  //Método para fazer login.
  onLogin() {
    this.authService.login(this.senha).subscribe({
      next: (_) => {
        // Navega para a página de dashboard se for bem-sucedido.
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Exibe a mensagem de erro se falhar.
        console.error('Erro ao fazer login', error);
        this.displayErrorMessage();
      },
    });
  }

  // Método para exibir mensagem de erro e esconder após 5 segundos
  private displayErrorMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 5000); // 5 segundos
  }
}
