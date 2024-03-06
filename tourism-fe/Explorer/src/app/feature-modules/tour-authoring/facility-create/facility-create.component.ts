import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Facility } from '../model/facility.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-facility-create',
  templateUrl: './facility-create.component.html',
  styleUrls: ['./facility-create.component.css']
})
export class FacilityCreateComponent  {

  facilities:Facility[]=[];

  ngAfterViewInit(): void {
    this.mapComponent.setStatus();
    this.mapComponent.registerOnClick();
    this.service.getFacilities().subscribe({
      next:(result:PagedResults<Facility>)=>{
        this.facilities=result.results;
        this.facilities.forEach((item)=>{
          this.mapComponent.initFacility(item);
        })
      }
    });
  }

  constructor(private service: TourAuthoringService, private router: Router,private toastr: ToastrService){}

  @ViewChild(MapComponent) mapComponent: MapComponent;

  facilityCreation=new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required])
  })

  createFacility(){
    if(this.facilityCreation.valid){
      const cords=this.mapComponent.getLastMarker();
      if(cords){
        const facility:Facility={
          id:0,
          name:this.facilityCreation.value.name || "",
          description:this.facilityCreation.value.description || "",
          image:this.facilityCreation.value.image || "",
          category:this.enumerateCategory(),
          latitude: cords.getLatLng().lat,
          longitude: cords.getLatLng().lng        
        }  
        this.service.createFacility(facility).subscribe({
          next:()=>{
            this.toastr.success('Facility created','Success');
            this.mapComponent.initFacility(facility);
            this.mapComponent.clearMarkers();
            this.router.navigate(['/tour-view']);
          },
          error: () =>{
            this.toastr.error('There was an error while trying to create a facility','Error');
          }
        });
      }
      else{
        this.toastr.warning('Please fill all of the fields','Warning');
      }
    }
    else{
      this.toastr.warning('Please fill all of the fields','Warning');
    }
  }

  enumerateCategory(){
    let category_numbered:number;
    switch (this.facilityCreation.value.category) {
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