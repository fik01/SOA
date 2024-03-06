import { Component } from '@angular/core';
import { Tour } from '../model/tour-model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourExecutionService } from '../tour-execution.service';
import { PositionSimulator, Session } from '../model/position-simulator.model';
import { Router } from '@angular/router';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';

@Component({
  selector: 'xp-bought-tours',
  templateUrl: './bought-tours.component.html',
  styleUrls: ['./bought-tours.component.css']
})
export class BoughtToursComponent {
  tours: Tour[] = [];
  userId: number;
  session: Session = {
    touristId: 0,
    locationId: 0,
    lastActivity: new Date(),
    completedKeyPoints: [],
    tourId: 0,
    sessionStatus: 0,
    transportation: 0
  };
  firstKeyPoint: TourKeyPoints;
  touristTours: Tour[] = [];
  noTouristTours: boolean = false;
  windowScrolled: boolean;
  constructor(private service: TourExecutionService, 
              private authService: AuthService,
              private router: Router) { }


  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
    this.getTours();
    this.getTouristTours();

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }


  activeTab: number = 1;

  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }


  getTours(): void {
    this.service.getPurchasedTours(this.userId).subscribe({
      next: (res => {
        res.forEach(item => {
          this.service.getTour(item.id).subscribe({
            next: (result) =>{
              this.tours.push(result);
            }
          })      
        })

        
      }),
      error: (error: any) => console.log(error),
      complete: (): void => { this.getSession() }
    })
  }

  getTouristTours(): void{
    const userId = this.userId;
    this.service.getTouristTours(userId).subscribe({
      next: (result) => {
        this.touristTours = result.results;
        if(this.touristTours.length == 0){
          this.noTouristTours = true;
        }
        console.log(this.touristTours);
      }
    })
  }

  getSession(): void {
    this.service.getActiveSessionByTouristId(this.userId).subscribe({
      next: (result => this.session = result),
      error: (error: any) => console.log(error),
      complete: (): void => { }
    }) 
  }  

  tourShow(id: number): void {
    console.log("nasao je")
    this.router.navigate(['/tour-all-details', id]);
  }


  startTour(event: Event, tourId: number): void {
    event.stopPropagation();
    this.router.navigate(['/map-view'], {queryParams: {tourId: tourId}});
  }

  viewTourProggres(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/map-view']);
  }   

  openTouristTour(tourId: number):void{
    this.router.navigate(['/tourist-tour-creation/', tourId]);
  }

  createNewTour(){
    this.router.navigate(['/tourist-tour-creation/0']);
  }

  createCampaign(){
    this.router.navigate(['/campaign-creation']);
  }

  goToTours(): void {
    this.router.navigate(['/tours']);
  }

}