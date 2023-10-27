//colaborador.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
})
export class ColaboradorComponent {
  @Input() colaborador: any; // Prop. de entrada para receber dados do componente pai.
  @Output() edit = new EventEmitter<any>(); // Emite os dados do colaborador que será editado.
  @Output() delete = new EventEmitter<number>(); // Emite o id do colaborador que será excluído.

  // Método chamado quando o botão 'Editar' é clicado. Emite o evento com os dados do colaborador atual.
  onEdit() {
    this.edit.emit(this.colaborador);
  }

  // Método chamado quando o botão 'Excluir' é clicado. Emite o evento com o id do colaborador atual.
  onDelete() {
    this.delete.emit(this.colaborador.id);
  }
}
