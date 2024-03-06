import { Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourAuthoringService } from '../tour-authoring.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TouristPublicKeypointSelectionComponent } from '../tourist-public-keypoint-selection/tourist-public-keypoint-selection.component';
import { PublicTourKeyPoints, TourKeyPoints } from '../model/tour-keypoints.model';
import { Tour } from '../model/tour.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourDuration, TransportationType } from '../model/tour-duration.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tourist-tour-creation',
  templateUrl: './tourist-tour-creation.component.html',
  styleUrls: ['./tourist-tour-creation.component.css']
})
export class TouristTourCreationComponent {
  publicKeyPoints: PublicTourKeyPoints[] = [];
  privateKeyPoints : TourKeyPoints[] = [];
  recommendedTours : Tour[] = [];

  totalCards: number;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  submitted:boolean=false;

  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;

  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }
  imageData = [
    "https://www.slikomania.rs/fotky6509/fotos/CFAZH6215E1.jpg",
    "https://s3.emmezeta.hr/media/catalog/product/6/6/664741-slika-bustling-city-70x140cm_4.jpg",
    "path/to/image3.jpg"
  ];
  @ViewChild(MapComponent) mapComponent: MapComponent;
  user: User | undefined;
  constructor(
    private service: TourAuthoringService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){}
  tour: Tour = {
    id: 0,
    name: '',
    description: '',
    difficulty: 0,
    tags: [],
    status: 0,
    price: 0,
    authorId: 0,
    equipment: [],
    distanceInKm: 0,
    archivedDate: undefined,
    publishedDate: undefined,
    durations: [],
    keyPoints: [],
  };
  walkTimeMin: number;
  carTimeMin: number;
  bicycleTimeMin: number;

  nesto: boolean=false
  editMode: boolean = false;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      const tourId = parseInt(idString!, 10);
      if(tourId != 0){
        this.getTour(tourId)
        this.editMode = true;
      }

    });

    this.cardsPerPage = 2;
  }

  ngAfterViewInit() {
    this.mapComponent.removeKeyPoint.subscribe(
      (keyPointData) => {
        const indexToRemove = this.tour.keyPoints.findIndex(keypoint => 
          keypoint.name === keyPointData.name && 
          keypoint.latitude === keyPointData.latitude && 
          keypoint.longitude === keyPointData.longitude);
  
        if (indexToRemove !== -1) {
          this.tour.keyPoints.splice(indexToRemove, 1);
        } else {
          console.error("Key point not found in the list");
        }

        this.removePublicKeypointFromList(keyPointData);
        if(this.tour.keyPoints.length <2){
          this.walkTimeMin = 0;
          this.carTimeMin = 0;
          this.bicycleTimeMin = 0;
        }
      }
    );
  }

  removePublicKeypointFromList(keyPointData : { name: string; latitude: number; longitude: number; }):void{
    const indexToRemovePublic = this.publicKeyPoints.findIndex(keypoint =>
      keypoint.name === keyPointData.name && 
      keypoint.latitude === keyPointData.latitude && 
      keypoint.longitude === keyPointData.longitude)

      if (indexToRemovePublic !== -1) {
        this.publicKeyPoints.splice(indexToRemovePublic, 1);
      } else {
        console.error("Key point not found in the list");
      }

      this.findRecommendedTours();
  }

  getTour(tourId: number){
    this.service.getTouristTourById(tourId).subscribe({
      next: (result) => {
        this.tour = result;
        this.patchFormData();
        this.loadCheckpointsToMap();
      }
    })
  }

  tourForm = new FormGroup({
    name: new FormControl('',Validators.required),
    walkTime: new FormControl('',Validators.required),
    bicycleTime: new FormControl('',Validators.required),
    carTime: new FormControl('',Validators.required)
  });

  private patchFormData() {
    this.tourForm.patchValue({
      "name": this.tour.name,
    });
  
    this.tour.durations.forEach(duration => {
      if (duration.transportation === TransportationType.Walking) {
        this.toggleFieldWalk();
        this.tourForm.patchValue({
          "walkTime": (duration.timeInSeconds / 60).toString()
        });
        this.walkTimeMin = parseInt(((duration.timeInSeconds / 60)/60).toString(), 10);
      } else if (duration.transportation === TransportationType.Bicycle) {
        this.toggleFieldBicycle(); 
        this.bicycleTimeMin = parseInt(((duration.timeInSeconds / 60)/60).toString(), 10);
        this.tourForm.patchValue({
          "bicycleTime": (duration.timeInSeconds / 60).toString()
        })
        
      } else if (duration.transportation === TransportationType.Car) {
        this.toggleFieldCar();
        this.tourForm.patchValue({
          "carTime": (duration.timeInSeconds / 60).toString()
        });
        this.carTimeMin = parseInt(((duration.timeInSeconds / 60)/60).toString(), 10);
      }
    });
  }


  isWalkChecked: boolean = false;
  showFieldWalk: boolean = false;
  isCarChecked: boolean = false;
  showFieldCar: boolean = false;
  isBicycleChecked: boolean = false;
  showFieldBicycle: boolean = false;

  toggleFieldWalk() {
    this.showFieldWalk = !this.showFieldWalk;
    this.isWalkChecked = !this.isWalkChecked;
    this.showFieldCar = false;
    this.isCarChecked = false;
    this.isBicycleChecked = false;
    this.showFieldBicycle = false;
    this.tourForm.value.carTime = '';
    this.tourForm.value.bicycleTime = '';
    this.setWalkingRouteData();

  }

  private setWalkingRouteData(){
    if (this.isWalkChecked) {
      this.mapComponent.setRouteTourist();
  
      this.mapComponent.routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        this.walkTimeMin = parseInt((summary.totalTime / 60).toString(), 10);
  
        this.tourForm.get('walkTime')?.setValue(summary.totalTime.toString());
      });
    } else {
      this.mapComponent.removeRoute();
    }
  }

  

  toggleFieldCar() {
    this.showFieldCar = !this.showFieldCar;
    this.isCarChecked = !this.isCarChecked;
    this.showFieldWalk = false;
    this.isWalkChecked = false;
    this.isBicycleChecked = false;
    this.showFieldBicycle = false;
    this.tourForm.value.bicycleTime = '';
    this.tourForm.value.walkTime = '';
    this.setCarRouteData();

  }

  private setCarRouteData(){
    if(this.isCarChecked){
      this.mapComponent.setRouteTourist('driving');
      this.mapComponent.routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        this.carTimeMin = parseInt((summary.totalTime / 60).toString(), 10);
  
        this.tourForm.get('carTime')?.setValue(summary.totalTime.toString());
        console.log(summary.totalTime.toString());
      });
    }
    else{
      this.mapComponent.removeRoute();
    }
  }

  toggleFieldBicycle() {
    this.showFieldCar = false;
    this.isCarChecked = false;
    this.showFieldWalk = false;
    this.isWalkChecked = false;
    this.isBicycleChecked = !this.isBicycleChecked;
    this.showFieldBicycle = !this.showFieldBicycle;
    this.tourForm.value.walkTime = '';
    this.tourForm.value.carTime = '';
    this.setCyclingRouteData();

  }

  private setCyclingRouteData(){
    if (this.isBicycleChecked) {
      this.mapComponent.setRouteTourist('cycling');
  
      this.mapComponent.routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        this.bicycleTimeMin = parseInt((summary.totalTime / 60).toString(), 10);
  
        this.tourForm.get('bicycleTime')?.setValue(summary.totalTime.toString());
        console.log(summary.totalTime.toString());
      });
    } else {
      this.mapComponent.removeRoute();
    }
  }

  addPublicKeyPoint(){
    const dialogRef = this.dialog.open(TouristPublicKeypointSelectionComponent,{
    });

    dialogRef.componentInstance.keyPointSelected.subscribe((selectedKeyPoint: PublicTourKeyPoints) => {
      let includesKeypoint : boolean = false;
      for(let kp of this.publicKeyPoints){
        if(kp.id === selectedKeyPoint.id){
          includesKeypoint = true;
          break;
        }

      }
      if(!includesKeypoint){
        this.publicKeyPoints.push(selectedKeyPoint);
        this.findRecommendedTours();
        const keypoint = this.addPublicKeyPointToTour(selectedKeyPoint);
        this.mapComponent.addKeyPointMarker(keypoint);
        var routeMode: string = 'walking';
        if(this.isWalkChecked){
          this.mapComponent.setRoute('walking');
          this.setWalkingRouteData();
        }
        else if(this.isCarChecked){
          this.mapComponent.setRoute('driving');
          this.setCarRouteData();
        }else if(this.isBicycleChecked){
          this.mapComponent.setRoute('cycling');
          this.setCyclingRouteData();
        }
        
        
      }
    });
    
  }

  findRecommendedTours(): void{
    this.privateKeyPoints = []
    this.recommendedTours = []
    for(let publicKp of this.publicKeyPoints){
      this.service.getKeypointsByPublicId(publicKp.id || 0).subscribe({
        next: (result : TourKeyPoints[]) =>{
          for(let r of result){
            this.privateKeyPoints.push(r);
          }

          for(let kp of this.privateKeyPoints){
            this.service.getTourForTourist(kp.tourId).subscribe({
              next:(result : Tour) => {
                const alreadyDisplayed = this.recommendedTours.find(t => t.id === result.id);
                if(!alreadyDisplayed){
                  this.recommendedTours.push(result);
                }
                this.totalCards = this.recommendedTours.length;  
                this.initializeSlider();
              }
            })
          }

          
        }
      })
    }

    
  }


  tourShow(tourId : number): void{
    this.router.navigate(['/tour-details', tourId]);
  }

  private addPublicKeyPointToTour(publicKeyPoint: PublicTourKeyPoints){
    const tourKeyPoint: TourKeyPoints={
      name: publicKeyPoint.name,
      description: publicKeyPoint.description,
      image: publicKeyPoint.image,
      longitude: publicKeyPoint.longitude,
      latitude: publicKeyPoint.latitude,
      tourId: 0,
      positionInTour: 0
    }
    this.tour.keyPoints.push(tourKeyPoint);
    return tourKeyPoint;
  }

  private loadCheckpointsToMap(): void {
    this.mapComponent.setStatus();

    this.mapComponent.clearMarkers();
    this.mapComponent.initTouristKeyPointsRoute(this.tour.keyPoints);
  }

  createTour(){
    this.submitted=true;
    
    this.makeNewTour();
    if(this.tour.keyPoints.length >= 2 && this.tourForm.value.name !== ''){
      if(this.isWalkChecked || this.isCarChecked || this.isBicycleChecked){
        this.service.createTouristTour(this.tour).subscribe({
          next: (response) =>{
            this.toastr.success('Tour modified','Success');
            this.router.navigate(['/bought-tours']);
          },
          error: () =>{
            this.toastr.error('There was an error while trying to modify a tour','Error');
          }
        })
      }
    }
  }

  makeNewTour(){
    this.tour.authorId = this.user?.id;
    this.tour.name = this.tourForm.value.name || '';
    this.tour.distanceInKm = this.mapComponent.getRouteDistanceInMeters() / 1000;
    this.tour.durations = this.getDurations();
    this.tour.price = 0;
  }


  private getDurations(): TourDuration[] {
    const tourdurations: TourDuration[] = [];
  
    if (this.isWalkChecked) {
      const walkDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.walkTime) * 60),
        transportation: TransportationType.Walking
      };
  
      tourdurations.push(walkDuration);
    }

    if (this.isBicycleChecked) {
      const bicycleDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.bicycleTime) * 60),
        transportation: TransportationType.Bicycle
      };
  
      tourdurations.push(bicycleDuration);
    }

    if (this.isCarChecked) {
      const carDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.carTime) * 60),
        transportation: TransportationType.Car
      };
  
      tourdurations.push(carDuration);
    }
  
    return tourdurations;
  }

  updadeTour():void{
    this.makeNewTour();
    if(this.tour.keyPoints.length >= 2 && this.tourForm.value.name !== ''){
      if(this.isWalkChecked || this.isCarChecked || this.isBicycleChecked){
        var oldTour: Tour = {
          id: 0,
          name: '',
          description: '',
          difficulty: 0,
          tags: [],
          status: 0,
          price: 0,
          authorId: 0,
          equipment: [],
          distanceInKm: 0,
          archivedDate: undefined,
          publishedDate: undefined,
          durations: [],
          keyPoints: [],
        };
        this.service.getTourById(this.tour.id!).subscribe({
          next: (response) => {
            oldTour = response;
            const removedKeyPoints = oldTour.keyPoints.filter(oldPoint =>
              !this.tour.keyPoints.some(newPoint => newPoint.id === oldPoint.id)
            );
    
            this.service.updateTouristTour(this.tour).subscribe({
              next: (response) =>{
                this.toastr.success('Tour updated','Success');
                removedKeyPoints.forEach(keyPoint =>{
                  this.service.deleteKeyPointsFromTouristTour(keyPoint.id!).subscribe();
                });
                this.router.navigate(['/bought-tours']);
              },
              error: () =>{
                this.toastr.error('There was an error while trying to update a tour','Error');
              }
            })
          }
        });
      }
    }

  }

  // prikaz tura
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    console.log("TOTAL PAGES: ",this.totalPages)
    console.log("TOTAL CARDS: ",this.totalCards)

    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
      this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
        20}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / (320));
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${
      (this.currentPage + 5)}px)`
  }

  
}