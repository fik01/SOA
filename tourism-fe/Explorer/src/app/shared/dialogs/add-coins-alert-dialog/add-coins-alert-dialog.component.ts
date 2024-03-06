import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCoinsAlert } from '../../model/add-coins-alert.model';

@Component({
  selector: 'xp-add-coins-alert-dialog',
  templateUrl: './add-coins-alert-dialog.component.html',
  styleUrls: ['./add-coins-alert-dialog.component.css']
})
export class AddCoinsAlertDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddCoinsAlert, private dialogRef: MatDialogRef<AddCoinsAlertDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
