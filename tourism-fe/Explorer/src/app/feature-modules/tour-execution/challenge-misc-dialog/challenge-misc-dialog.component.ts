import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'xp-challenge-misc-dialog',
  templateUrl: './challenge-misc-dialog.component.html',
  styleUrls: ['./challenge-misc-dialog.component.css'],
})
export class ChallengeMiscDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChallengeMiscDialogComponent>
  ) {}

  closeDialog(): void {
    // You can perform additional actions before closing the dialog if needed
    this.dialogRef.close();
  }
}
