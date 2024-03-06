import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Facility, FacilityPointDto } from '../model/facility.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-facility-update',
  templateUrl: './facility-update.component.html',
  styleUrls: ['./facility-update.component.css']
})
export class FacilityUpdateComponent {

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
    
  }

  @ViewChild(MapComponent) mapComponent: MapComponent;

  facilityUpdateForm=new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required])
  })

  public facility: Facility;
  public id: number;
  public longitude: number;
  public latitude: number;
  public newFacility: FacilityPointDto;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService, private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.service.getFacilityById(this.id).subscribe((result: Facility) => {
      this.facility = result;
      this.facilityUpdateForm.patchValue({
        name: result.name,
        description: result.description,
        image: result.image,
        category: this.enumerateCategory(result.category)
      });
      this.newFacility = this.mapComponent.initFacilityMarker(result.image, result.latitude, result.longitude);
    });
  }

  enumerateCategory(category: number) {
    let category_string: string;
    switch (category) {
      case 0:
        category_string = 'wc';
        break;
      case 1:
        category_string = 'restaurant';
        break;
      case 2:
        category_string = 'parking';
        break;
      default:
        category_string = '';
    }
    return category_string;
  } 

  updateFacility() {
    if (this.newFacility.latitude != this.facility.latitude && this.newFacility.latitude != 0)
    {
      this.facility.latitude = this.newFacility.latitude;
    }

    if (this.newFacility.longitude != this.facility.longitude && this.newFacility.longitude != 0)
    {
      this.facility.longitude = this.newFacility.longitude;
    }

    if (this.facilityUpdateForm.valid) {
      const currentDate = new Date();
      
      this.facility.name = this.facilityUpdateForm.value.name || "";
      this.facility.description = this.facilityUpdateForm.value.description || "";
      this.facility.image = this.facilityUpdateForm.value.image || "";
      this.facility.category = this.categoryStringToNumber();

      this.service.updateFacility(this.facility).subscribe({
        next:()=>{
          this.toastr.success('Facility updated','Success');
          this.router.navigate(['/tour-view']);
        },
        error: () =>{
          this.toastr.error('There was an error while trying to update a facility','Error');
        }
      })
    }
  }
  cancelFacility(){
    this.router.navigate(['/tour-view']);
  }
  categoryStringToNumber(){
    let category_numbered:number;
    switch (this.facilityUpdateForm.value.category) {
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
