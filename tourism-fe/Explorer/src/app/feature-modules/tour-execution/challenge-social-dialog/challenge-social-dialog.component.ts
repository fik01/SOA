import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'xp-challenge-social-dialog',
  templateUrl: './challenge-social-dialog.component.html',
  styleUrls: ['./challenge-social-dialog.component.css']
})
export class ChallengeSocialDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChallengeSocialDialogComponent>
  ) {}

  closeDialog(): void {
    // You can perform additional actions before closing the dialog if needed
    this.dialogRef.close();
  }
}
