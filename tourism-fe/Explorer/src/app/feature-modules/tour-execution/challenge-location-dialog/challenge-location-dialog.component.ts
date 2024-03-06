import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'xp-challenge-location-dialog',
  templateUrl: './challenge-location-dialog.component.html',
  styleUrls: ['./challenge-location-dialog.component.css']
})
export class ChallengeLocationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChallengeLocationDialogComponent>
  ) {}

  closeDialog(): void {
    // You can perform additional actions before closing the dialog if needed
    this.dialogRef.close();
  }
}
