import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-colaborador-dialog',
  templateUrl: './edit-colaborador-dialog.component.html',
})
export class EditColaboradorDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditColaboradorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      cpf: [data.cpf],
      nome: [data.nome],
      cargo: [data.cargo],
      setor: [data.setor],
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const colaborador = this.editForm.value;
    this.dialogRef.close(colaborador);
  }
}
