import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteAlert } from '../../model/delete-alert.model';

@Component({
  selector: 'xp-delete-alert-dialog',
  templateUrl: './delete-alert-dialog.component.html',
  styleUrls: ['./delete-alert-dialog.component.css']
})
export class DeleteAlertDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteAlert, private dialogRef: MatDialogRef<DeleteAlertDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
