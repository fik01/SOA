import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule } from '@angular/forms';
import { KeyPointDetailsDialogComponent } from './key-point-details-dialog/key-point-details-dialog.component';
import { ChallengeDetailsDialogComponent } from './challenge-details-dialog/challenge-details-dialog.component'

@NgModule({
  declarations: [
    MapComponent,
    KeyPointDetailsDialogComponent,
    ChallengeDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
