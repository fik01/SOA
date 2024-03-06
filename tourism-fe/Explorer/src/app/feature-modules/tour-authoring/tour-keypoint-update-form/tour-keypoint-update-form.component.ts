import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourKeyPointDto, TourKeyPoints } from '../model/tour-keypoints.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour-keypoint-update-form',
  templateUrl: './tour-keypoint-update-form.component.html',
  styleUrls: ['./tour-keypoint-update-form.component.css']
})
export class TourKeypointUpdateFormComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService, private router: Router, private toastr: ToastrService) {
  }

  private tourKeypointToUpdate: TourKeyPoints;
  private newKeyPoint: TourKeyPointDto = {latitude: 0, longitude: 0};

  tourKeyPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('')
  })

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState && navigationState.data) {
      this.tourKeypointToUpdate  = navigationState.data;
      console.log(this.tourKeypointToUpdate);
      // Access the data as myObject.key1 and myObject.key2
    }

    if (this.tourKeypointToUpdate.id != null)
    {
      this.service.getTourKeyPointById(this.tourKeypointToUpdate.id).subscribe((result: TourKeyPoints) => {
        this.tourKeyPointForm.patchValue({
          name: result.name,
          description: result.description,
          image: result.image
        });
        this.newKeyPoint.latitude = result.latitude;
        this.newKeyPoint.longitude = result.longitude;
        this.newKeyPoint = this.mapComponent.initKeyPointMarker(result.latitude, result.longitude);
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
  }

  updateKeyPoint() {
    if (this.newKeyPoint.latitude != this.tourKeypointToUpdate.latitude && this.newKeyPoint.latitude != 0)
    {
      this.tourKeypointToUpdate.latitude = this.newKeyPoint.latitude;
    }

    if (this.newKeyPoint.longitude != this.tourKeypointToUpdate.latitude && this.newKeyPoint.longitude != 0)
    {
      this.tourKeypointToUpdate.longitude = this.newKeyPoint.longitude;
    }

    if (this.tourKeyPointForm.valid) {
      this.tourKeypointToUpdate.name = this.tourKeyPointForm.value.name || "";
      this.tourKeypointToUpdate.description = this.tourKeyPointForm.value.description || "";
      this.tourKeypointToUpdate.image = this.tourKeyPointForm.value.image || "";

      this.service.updateTourKeyPoint(this.tourKeypointToUpdate).subscribe({
        next:()=>{
          
          this.toastr.success('Keypoint updated','Success');
          this.router.navigate(['/tour-view']);
        },
        error: () =>{
          this.toastr.error('There was an error while trying to update a keypoint','Error');
        }
      })
    }
  }

  cancel() {
    this.router.navigate(['/tour-view']);
  }
}
