import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MapModule } from '../map/map.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourRatingFormComponent } from './tour-rating-form/tour-rating-form.component';


@NgModule({
  declarations: [
    MapViewComponent,
    TourRatingFormComponent
  ],
  imports: [
    CommonModule, 
    MapModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MapViewComponent,
    TourRatingFormComponent
  ]
})
export class MapViewModule { }
