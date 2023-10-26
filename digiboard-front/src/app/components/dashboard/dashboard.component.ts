//dashboard.component.ts
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
  // Flag para indicar se a página está em estado de carregamento.
  isLoading = false;

  // Modelo para um novo colaborador.
  newColaborador = {
    cpf: '',
    nome: '',
    cargo: '',
    setor: '',
  };

  // Lista de colaboradores, setores e cargos.
  colaboradores: any = [];
  setores: string[] = [];
  cargos: string[] = [];

  // Modo de listagem atual (todos, por setor ou por cargo).
  listingMode: 'all' | 'setor' | 'cargo' = 'all';

  constructor(
    private colaboradorService: ColaboradorService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  // Buscar a lista de colaboradores ao iniciar.
  ngOnInit() {
    this.fetchColaboradores();
  }

  // Atualizar o modo de listagem com base na seleção do usuário.
  updateListingMode() {
    if (this.listingMode === 'setor') {
    } else if (this.listingMode === 'cargo') {
    } else {
      this.fetchColaboradores();
    }
  }

  // Método para buscar todos os colaboradores.
  // Atualização dos arrays 'setores' e 'cargos' com valores únicos da lista de colaboradores.
  // Definir 'isLoading' como false após o carregamento dos dados.
  fetchColaboradores() {
    this.isLoading = true;
    this.colaboradorService.fetchColaboradores().subscribe((data: any) => {
      this.colaboradores = data;
      this.setores = Array.from(new Set(data.map((c: any) => c.setor)));
      this.cargos = Array.from(new Set(data.map((c: any) => c.cargo)));
      this.isLoading = false;
    });
  }

  // Método para listar colaboradores por setor
  listBySetor(setor: string) {
    this.colaboradorService
      .fetchColaboradoresBySetor(setor)
      .subscribe((data: any) => {
        this.colaboradores = data;
      });
  }

  // Método para listar colaboradores por cargo
  listByCargo(cargo: string) {
    this.colaboradorService
      .fetchColaboradoresByCargo(cargo)
      .subscribe((data: any) => {
        this.colaboradores = data;
      });
  }

  // Método para adicionar um novo colaborador
  // Resetar o modelo 'newColaborador' após a adição.
  addColaborador() {
    this.colaboradorService
      .addColaborador(this.newColaborador)
      .subscribe((data: any) => {
        this.fetchColaboradores();
        this.newColaborador = { cpf: '', nome: '', cargo: '', setor: '' };
      });
  }

  // Método para deletar um colaborador
  // Atualizar a lista após a deleção.
  deleteColaborador(id: number) {
    this.colaboradorService.deleteColaborador(id).subscribe(() => {
      this.fetchColaboradores();
    });
  }

  // Método para abrir o diálogo de edição de colaborador (abre o diálogo e atualiza a lista após o fechamento)
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

  // Método para fazer logout e retornar à rota inicial ('/')
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
