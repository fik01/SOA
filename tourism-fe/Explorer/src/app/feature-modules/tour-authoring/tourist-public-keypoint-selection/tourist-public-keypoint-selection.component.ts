import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourAuthoringService } from '../tour-authoring.service';
import { PublicTourKeyPoints } from '../model/tour-keypoints.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tourist-public-keypoint-selection',
  templateUrl: './tourist-public-keypoint-selection.component.html',
  styleUrls: ['./tourist-public-keypoint-selection.component.css']
})
export class TouristPublicKeypointSelectionComponent {
  constructor(private service: TourAuthoringService, 
    @Inject(MAT_DIALOG_DATA) public data: { tourId: number },
    private dialogRef: MatDialogRef<TouristPublicKeypointSelectionComponent>,){}

    publicKeyPoints: PublicTourKeyPoints[] = [];

    ngOnInit(): void
    {
      this.service.getPublicTourKeyPointsForTourist().subscribe({
        next: (result : PublicTourKeyPoints[]) => {
            this.publicKeyPoints = result;
        }
      });
  
    }
    @Output() keyPointSelected = new EventEmitter<PublicTourKeyPoints>()
    choseKeyPoint(publicKeyPoint: PublicTourKeyPoints){
      this.keyPointSelected.emit(publicKeyPoint);
      this.dialogRef.close(); 
    }
}
