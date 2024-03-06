import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { TourKeyPoints } from 'src/app/feature-modules/tour-authoring/model/tour-keypoints.model';
import { TourAuthoringService } from 'src/app/feature-modules/tour-authoring/tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';



@Component({
  selector: 'xp-key-point-details-dialog',
  templateUrl: './key-point-details-dialog.component.html',
  styleUrls: ['./key-point-details-dialog.component.css']
})
export class KeyPointDetailsDialogComponent {
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: TourKeyPoints, private authService: AuthService,
  private tourAuthoringService: TourAuthoringService, private dialogRef: MatDialogRef<KeyPointDetailsDialogComponent>, private router: Router) {}

  user = this.authService.user$.getValue();
  public numberOfKeypoints: number = 0;

  ngOnInit() {
    this.numberOfKeypoints = 0;
    this.tourAuthoringService.getTourKeyPointsByTourId(this.data.tourId).subscribe({
      next: (result: TourKeyPoints[])=>{
        result.forEach(element => {
          this.numberOfKeypoints++;
        });
      }
    }
    )
  }

  updateKeyPoint(){
    this.dialogRef.close();
    //this.router.navigate(['facilities/update/', this.data.id]);
    //window.location.href = 'http://localhost:4200/facilities/update/'+this.data.id;
    this.router.navigate(['/keypoint-update'], {state: {data: this.data}});
  }

  showChallengeForm(){
    this.router.navigate(['challenges/'+this.data.id]);
    this.dialogRef.close();
  }

  deleteKeypoint(){
    if (this.data.id != null)
    {
      this.tourAuthoringService.deleteTourKeyPoint(this.data.id).subscribe({
        next:()=>{
          console.log("Works");
          this.deleteClicked.emit(this.data.tourId);
          this.dialogRef.close();
        }
      });
    }
  }
}
