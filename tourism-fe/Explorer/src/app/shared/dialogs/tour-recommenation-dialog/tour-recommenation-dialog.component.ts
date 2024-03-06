import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TourRatingFormComponent } from '../../map-view/tour-rating-form/tour-rating-form.component';
import { TourRecommendationComponent } from 'src/app/feature-modules/layout/tour-recommendation/tour-recommendation.component';

@Component({
  selector: 'xp-tour-recommenation-dialog',
  templateUrl: './tour-recommenation-dialog.component.html',
  styleUrls: ['./tour-recommenation-dialog.component.css']
})
export class TourRecommenationDialogComponent {
  tourId: number;
  constructor(public dialogRef: MatDialogRef<TourRatingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tourId: number },
    public dialog: MatDialog) {
      this.tourId = data.tourId;
  }

  noClick() {
    this.dialogRef.close();
  }

  yesClick(){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(TourRecommendationComponent, {
      width: '80vw',
      height: '90vh',
      data: { tourId: this.tourId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      document.body.classList.remove('blur-background');
    });
  }
}
