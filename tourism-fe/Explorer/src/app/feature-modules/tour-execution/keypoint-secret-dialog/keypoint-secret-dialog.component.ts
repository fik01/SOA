import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'xp-keypoint-secret-dialog',
  templateUrl: './keypoint-secret-dialog.component.html',
  styleUrls: ['./keypoint-secret-dialog.component.css']
})
export class KeypointSecretDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<KeypointSecretDialogComponent>
  ) {}

  closeDialog(): void {
    // You can perform additional actions before closing the dialog if needed
    this.dialogRef.close();
  }
}
