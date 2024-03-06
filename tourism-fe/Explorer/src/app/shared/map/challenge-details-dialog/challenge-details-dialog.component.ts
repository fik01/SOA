import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Challenge, ChallengeType } from 'src/app/feature-modules/administration/model/challenge.model';

@Component({
  selector: 'xp-challenge-details-dialog',
  templateUrl: './challenge-details-dialog.component.html',
  styleUrls: ['./challenge-details-dialog.component.css']
})
export class ChallengeDetailsDialogComponent {

  challengeType: any = ChallengeType;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Challenge) { }
}
