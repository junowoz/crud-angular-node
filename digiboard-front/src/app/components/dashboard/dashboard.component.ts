import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../services/colaborador.service';
import { MatDialog } from '@angular/material/dialog';
import { EditColaboradorDialogComponent } from '../edit-colaborador-dialog/edit-colaborador-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  newColaborador = {
    cpf: '',
    nome: '',
    cargo: '',
    setor: '',
  };

  colaboradores: any = [];

  constructor(
    private colaboradorService: ColaboradorService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchColaboradores();
  }

  fetchColaboradores() {
    this.colaboradorService.fetchColaboradores().subscribe((data: any) => {
      this.colaboradores = data;
    });
  }

  listBySetor(setor: string) {
    this.colaboradorService
      .fetchColaboradoresBySetor(setor)
      .subscribe((data: any) => {
        this.colaboradores = data;
      });
  }

  listByCargo(cargo: string) {
    this.colaboradorService
      .fetchColaboradoresByCargo(cargo)
      .subscribe((data: any) => {
        this.colaboradores = data;
      });
  }

  addColaborador() {
    this.colaboradorService
      .addColaborador(this.newColaborador)
      .subscribe((data: any) => {
        this.fetchColaboradores();
        this.newColaborador = { cpf: '', nome: '', cargo: '', setor: '' };
      });
  }

  deleteColaborador(id: number) {
    this.colaboradorService.deleteColaborador(id).subscribe(() => {
      this.fetchColaboradores();
    });
  }

  //adicione aqui o editar colaborador
  editColaborador(colaborador: any): void {
    const dialogRef = this.dialog.open(EditColaboradorDialogComponent, {
      width: '500px',
      data: colaborador,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.colaboradorService
          .updateColaborador(colaborador.id, result)
          .subscribe(() => {
            this.fetchColaboradores();
          });
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
