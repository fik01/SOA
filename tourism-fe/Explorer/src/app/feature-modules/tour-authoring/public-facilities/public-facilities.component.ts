import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourAuthoringService } from '../tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PublicFacility } from '../model/facility.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-public-facilities',
  templateUrl: './public-facilities.component.html',
  styleUrls: ['./public-facilities.component.css']
})
export class PublicFacilitiesComponent {
  user: User | undefined;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  private mapComponentInitialized = false;

  constructor(private service: TourAuthoringService, private authService: AuthService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      this.user = user;
    })
  }

  publicFacilitiesForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    category: new FormControl('',[Validators.required])
  });

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
    this.mapComponent.registerOnClick();
    this.mapComponentInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.publicFacilitiesForm.reset();
    if (this.mapComponentInitialized) {
      this.mapComponent.clearMarkers();
    }
  }

  createFacility(): void {
    const cordinates = this.mapComponent.getLastMarker();
    if(cordinates==null)this.toastr.warning('Please select a location','Warning');
    const publicFacility: PublicFacility = {
      name: this.publicFacilitiesForm.value.name || "",
      description: this.publicFacilitiesForm.value.description || "",
      image: this.publicFacilitiesForm.value.image || "",
      longitude: cordinates.getLatLng().lng,
      latitude: cordinates.getLatLng().lat,
      status: 'Pending',
      creatorId: this.user!.id,
      category: this.enumerateCategory(),
      id: 0
    };
    console.log(publicFacility)
    this.service.addPublicFacility(publicFacility).subscribe({
      next: (result) => {
        console.log(result);
        this.toastr.success('Public facility created','Success');
        location.reload();
      },
      error: () =>{
        this.toastr.error('There was an error while trying to create a public facility','Error');
      }
    })
  }

  enumerateCategory(){
    let category_numbered:number;
    switch (this.publicFacilitiesForm.value.category) {
      case 'wc':
        category_numbered=0;
        break;
      case 'restaurant':
        category_numbered=1;
        break;
      case 'parking':
        category_numbered=2;
        break;
      default:
        category_numbered=3;
    }
    return category_numbered;
  } 
}
