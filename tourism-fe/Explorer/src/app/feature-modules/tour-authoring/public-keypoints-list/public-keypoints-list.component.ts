import { Component, Inject } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { PublicTourKeyPoints, TourKeyPoints } from '../model/tour-keypoints.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tour } from '../model/tour.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-public-keypoints-list',
  templateUrl: './public-keypoints-list.component.html',
  styleUrls: ['./public-keypoints-list.component.css']
})
export class PublicKeypointsListComponent {
  constructor(private service: TourAuthoringService, 
    @Inject(MAT_DIALOG_DATA) public data: { tourId: number },
    private dialogRef: MatDialogRef<PublicKeypointsListComponent>,
    private toastr: ToastrService){}

  publicKeyPoints: PublicTourKeyPoints[] = [];
  ngOnInit(): void
  {
    this.service.getPublicTourKeyPoints().subscribe({
      next: (result: PublicTourKeyPoints[]) => {
        this.publicKeyPoints = result;
      }
    });


  }

  addToKeypoints(selectedKeyPoint: PublicTourKeyPoints){
    let position = 0;
    this.service.getTour(this.data.tourId).subscribe({
      next: (result: Tour) => {
        console.log(`kp num=${result.keyPoints.length}`);
        console.log(
          `num to be set=${
            result.keyPoints.length > 0
              ? result.keyPoints[result.keyPoints.length - 1].positionInTour + 1
              : 0
          }`
        );
        position =
          result.keyPoints.length > 0
            ? result.keyPoints[result.keyPoints.length - 1].positionInTour + 1
            : 0;
        const tourKeyPoint: TourKeyPoints = {
          name: selectedKeyPoint.name,
          description: selectedKeyPoint.description,
          image: selectedKeyPoint.image,
          longitude: selectedKeyPoint.longitude,
          latitude: selectedKeyPoint.latitude,
          tourId: this.data.tourId,
          positionInTour: position,
          publicPointId: selectedKeyPoint.id
        };
        this.service.addTourKeyPoint(tourKeyPoint).subscribe({
          next: () => {
            this.toastr.success('Tour keypoint added','Success');
            this.dialogRef.close(); 
            },
            error: () =>{
              this.toastr.error('There was an error while trying to add a tour keypoint','Error');
            }
          });
      },
    });
  }
}
