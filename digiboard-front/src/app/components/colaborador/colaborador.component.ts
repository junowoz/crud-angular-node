//colaborador.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
})
export class ColaboradorComponent {
  @Input() colaborador: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.colaborador);
  }

  onDelete() {
    this.delete.emit(this.colaborador.id);
  }
}
