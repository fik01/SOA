import {  Component, OnInit, ViewChild } from '@angular/core';
import { Tour, TourDifficulty } from '../model/tour.model';
import { TourKeyPoints } from '../model/tour-keypoints.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Facility } from '../model/facility.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { TourKeypointsComponent } from '../tour-keypoints/tour-keypoints.component';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'xp-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css']
})
export class TourViewComponent implements OnInit{
 
  check: boolean = false;
  constructor(private tourService: TourAuthoringService, private router: Router){}

  @ViewChild(MapComponent) mapComponent: MapComponent;
  selectedCategory: string;
  facilities: Facility[];
  keypoints: TourKeyPoints[];

  tours: Tour[] = [];
  displayed: string[] = ['name','difficulty','tags','price', 'addNewKeyPoint'];
  tourDifficulty = TourDifficulty;

  clearSelection(){
    this.selectedCategory='';
  }

  ngOnInit(): void {
    //servis koji dobavlja podatke i smjesta ih u tours
    this.tourService.getTours().subscribe({
      next:(
        result: PagedResults<Tour>
      ) => {
        this.tours = result.results;
      }
    })

    this.tourService.getFacilities().subscribe({
      next:(result:PagedResults<Facility>)=>{
        this.facilities=result.results;
      }
    });
  }

  onCategoryChange(index: number) {
    this.mapComponent.removeFacilities();
    this.facilities.forEach((item)=>{
      if(item.category==index){
        this.mapComponent.initFacility(item);
      }  
    })
  }

  onCreateNewKeyPoint(tourId: number)
  {
    this.router.navigate(['/keypoints/create/', tourId, 1]);
  }

  onRowClick(row:Tour){

    this.mapComponent.clearMarkers();

    if (row.id != null)
    {
      this.tourService.getTourKeyPointsByTourId(row.id).subscribe({
        next:(result: TourKeyPoints[])=>{
          this.keypoints = result;

          this.mapComponent.initKeyPointsRoute(this.keypoints);
        }
      });
    }
    this.mapComponent.setRoute();
  }

  onCreateFacility() {
    this.router.navigate(['/facilities/create/']);
  }
}
