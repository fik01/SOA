import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from 'src/app/shared/map/map.module';
import { BoughtToursComponent } from './bought-tours/bought-tours.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TouristTourViewComponent } from './tourist-tour-view/tourist-tour-view.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { TourAllDetailsComponent } from './tour-all-details/tour-all-details.component';
import { KeypointSecretDialogComponent } from './keypoint-secret-dialog/keypoint-secret-dialog.component';
import { TourSearchComponent } from './tour-search/tour-search.component';
import { ChallengesViewComponent } from './challenges-view/challenges-view.component';
import { ChallengeLocationDialogComponent } from './challenge-location-dialog/challenge-location-dialog.component';
import { RecommendedToursComponent } from './recommended-tours/recommended-tours.component';
import { TourProblemFormComponent } from './tour-problem-form/tour-problem-form.component';
import { ActiveToursComponent } from './active-tours/active-tours.component';
import { ChallengeMiscDialogComponent } from './challenge-misc-dialog/challenge-misc-dialog.component';
import { ChallengeSocialDialogComponent } from './challenge-social-dialog/challenge-social-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    BoughtToursComponent,
    TouristTourViewComponent,
    TourAllDetailsComponent,
    KeypointSecretDialogComponent,
    TourSearchComponent,
    ChallengesViewComponent,
    ChallengeLocationDialogComponent,
    RecommendedToursComponent,
    TourProblemFormComponent,
    ActiveToursComponent,
    ChallengeMiscDialogComponent,
    ChallengeSocialDialogComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    TouristTourViewComponent,
    TourAllDetailsComponent,
    TourSearchComponent,
    TourProblemFormComponent,
    ActiveToursComponent,
    RecommendedToursComponent
  ]
})
export class TourExecutionModule { }
