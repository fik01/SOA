import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RateAlert } from '../../model/rate-alert.model';

@Component({
  selector: 'xp-rate-alert-dialog',
  templateUrl: './rate-alert-dialog.component.html',
  styleUrls: ['./rate-alert-dialog.component.css']
})
export class RateAlertDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: RateAlert, private dialogRef: MatDialogRef<RateAlertDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
