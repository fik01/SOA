import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PublicTourKeyPoints } from '../model/tour-keypoints.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ToastrService } from 'ngx-toastr';
import { Marker } from 'leaflet';

@Component({
  selector: 'xp-public-tour-keypoints',
  templateUrl: './public-tour-keypoints.component.html',
  styleUrls: ['./public-tour-keypoints.component.css']
})
export class PublicTourKeypointsComponent {
  
  user: User | undefined;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  private mapComponentInitialized = false;

  constructor(private service: TourAuthoringService, private authService: AuthService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      this.user = user;
    })
  }

  publicKeyPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('')
  });

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
    this.mapComponent.registerOnClick();
    this.mapComponentInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.publicKeyPointForm.reset();
    if (this.mapComponentInitialized) {
      this.mapComponent.clearMarkers();
    }
  }

  createPublicKeyPoint(): void {
    const cordinates = this.mapComponent.getLastMarker();
    const publicTourKeyPoint: PublicTourKeyPoints = {
      name: this.publicKeyPointForm.value.name || "",
      description: this.publicKeyPointForm.value.description || "",
      image: this.publicKeyPointForm.value.image||"",
      longitude: cordinates.getLatLng().lng,
      latitude: cordinates.getLatLng().lat,
      status: 'Pending',
      creatorId: this.user!.id
    };
    console.log(publicTourKeyPoint)
    this.service.addPublicTourKeyPoint(publicTourKeyPoint).subscribe({
      next: () => {
        this.toastr.success('Public keypoint created','Success');
        location.reload();
      },
      error: () =>{
        this.toastr.error('There was an error while trying to add a public tour keypoint','Error');
      }
    })
  }

}
