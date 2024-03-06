import { Component, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TourKeyPoints } from '../model/tour-keypoints.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from '../model/tour.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Marker } from 'leaflet';

@Component({
  selector: 'xp-tour-keypoints',
  templateUrl: './tour-keypoints.component.html',
  styleUrls: ['./tour-keypoints.component.css'],
})
export class TourKeypointsComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  tourKeyPoints: TourKeyPoints[] = [];
  selectedTourKeyPoint: TourKeyPoints;
  shouldEdit: boolean = false;
  showForm: boolean = false;
  tourId: number;
  private mapComponentInitialized = false;
  mode: KeypointCreationMode;
  submitted: boolean=false;
  tourKeyPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('',[Validators.required]),
    secret: new FormControl('',[Validators.required])
  });

  constructor(
    private service: TourAuthoringService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { tourId: number },
    private dialogRef: MatDialogRef<TourKeypointsComponent>,
    private toastr: ToastrService
  ) {
    this.tourKeyPointForm.patchValue({
      image: 'https://example.com/default-image.jpg' // Set your default image URL here
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tourId = this.data.tourId;
      this.mode = parseInt(params['mode']);
    });
  }

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
    this.mapComponent.registerOnClick();
    this.mapComponentInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tourKeyPointForm.reset();
    if (this.mapComponentInitialized) {
      this.mapComponent.clearMarkers();
    }
  }

  ngOnDestroy(): void {
    this.router.navigate([`tour-creation-form/${this.tourId}/1`]);
  }

  getTourKeyPoints(): void {
    this.service.getTourKeyPoints().subscribe({
      next: (result: PagedResults<TourKeyPoints>) => {
        this.tourKeyPoints = result.results;
      },
      error: () => {},
    });
  }

  onAddClick(): void {
    this.showForm = true;
    this.shouldEdit = false;
  }

  // Handle the event from the child component and set showForm to false
  onOperationComplete(): void {
    this.showForm = false;
    this.shouldEdit = false;
  }
  closeForm(){
    this.dialogRef.close();
  }
  coordinates: Marker;
  addTourKeyPoint(): void {
    this.submitted=true;
    const cordinates = this.mapComponent.getLastMarker();
    this.coordinates=cordinates;
    let position = 0;
    this.service.getTour(this.tourId).subscribe({
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
          name: this.tourKeyPointForm.value.name || '',
          description: this.tourKeyPointForm.value.description || '',
          image: this.tourKeyPointForm.value.image || "https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=",
          longitude: cordinates.getLatLng().lng,
          latitude: cordinates.getLatLng().lat,
          tourId: this.tourId,
          positionInTour: position,
          secret: this.tourKeyPointForm.value.secret || ""
        };
        if (this.tourKeyPointForm.valid && cordinates)
          this.service.addTourKeyPoint(tourKeyPoint).subscribe({
            next: () => {
              this.toastr.success('Keypoint added','Success');
              this.mapComponent.clearMarkers();
              this.dialogRef.close(); 
            },
            error: () =>{
              this.toastr.error('There was an error while trying to add a keypoint','Error');
            }
          });
      },
    });
  }
  updateMapMarker(latitude: number, longitude: number): void {
    this.mapComponent.clearMarkers();
    this.mapComponent.addMarker(latitude, longitude);
  }
}



enum KeypointCreationMode {
  Create, // During tour creation
  Edit, // During tour editing
}
