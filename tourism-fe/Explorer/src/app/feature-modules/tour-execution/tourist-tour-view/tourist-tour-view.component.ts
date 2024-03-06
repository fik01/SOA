import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild, AfterViewInit, HostListener, Inject} from '@angular/core';
import { TourDifficulty, TourStatus } from '../../tour-authoring/model/tour.model';
import { User } from '../../administration/model/user.model';
import { TourExecutionService } from '../tour-execution.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { Tour } from '../model/tour-model';
import {ShoppingCartService} from "../../marketplace/shopping-cart/shopping-cart.service";
import { MatDialog } from '@angular/material/dialog';
import { TourSearchComponent } from '../tour-search/tour-search.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { TourPreferences } from '../../marketplace/model/tour-preferences.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { Bundle } from '../../marketplace/model/bundle.model';
import { PaymentRecord } from '../../marketplace/model/payment-record.model';
import { ToastrService } from 'ngx-toastr';
import { TourSearchMapComponent } from '../../marketplace/tour-search-map/tour-search-map.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'xp-tourist-tour-view',
  templateUrl: './tourist-tour-view.component.html',
  styleUrls: ['./tourist-tour-view.component.css'],
})
export class TouristTourViewComponent implements OnInit {
  showTourDetails:boolean = false;
  tourDifficulty = TourDifficulty;
  allTours: Tour[] = []
  tours: Tour[] = []
  user: User | undefined
  selectedTour: Tour
  keypoints: TourKeyPoints[]
  firstKeyPoint: TourKeyPoints
  buttonStatus: boolean[];
  bundleButtonStatus: boolean[]
  lat: number = -1
  lon: number = -1
  radius: number = -1
  userId: number
  bundles: Bundle[]
  toursInBundle: Tour[] = []
  paymentRecords: PaymentRecord[] = []
  toursChecked: boolean = true;

  preference : TourPreferences = {
    difficultyLevel: NaN,
    walkingRate: NaN,
    bicycleRate: NaN,
    carRate: NaN,
    boatRate: NaN,
    tags: []
  }
  sortedTours : Tour[] = []
  toursDisplay: Tour[] = []

  windowScrolled: boolean;

  @ViewChild(TourSearchComponent) tourSearchComponent : TourSearchComponent;

  constructor(private service: TourExecutionService,
    private cartService: ShoppingCartService,
    private marketService: MarketplaceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService){}

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
    this.getTours();

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  activeTab: number = 1;

  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  getTours(): void {
    const userId = this.userId;

    this.service.getPurchasedTours(userId).subscribe(purchasedTours => {
      const purchasedTourIds = purchasedTours.map(tour => tour.id);

      this.service.getUsedTours(userId).subscribe(usedTours => {
        const usedTourIds = usedTours.map(tour => tour.id);

        this.service.getTours().subscribe({
          next: (result: PagedResults<Tour>) => {
            this.allTours = result.results;

            this.tours = this.allTours.filter(tour =>
              tour.status === TourStatus.Published &&
              !purchasedTourIds.includes(tour.id) &&
              !usedTourIds.includes(tour.id)
            );

            this.displayToursByPreferences();
            this.buttonStatus = new Array(this.toursDisplay.length).fill(false);
            this.checkButtonStatus();
          },
          error: (error: any) => console.log(error),
          complete: ():void => {
            this.marketService.getAllPaymentRecords().subscribe({
              next: (result => this.paymentRecords = result.results),
              error: (error: any) => console.log(error),
              complete: (): void => {this.getAllBundles(); console.log(this.paymentRecords)}
            })
            
            }
        });
      });
    });
  }

  getAllBundles() {
    this.marketService.getAllBundles().subscribe({
      next: (result => {
        this.bundles = result.results.filter(b => b.bundleState == 1);
        this.paymentRecords.forEach(paymentRecord => {
          if(paymentRecord.touristId == this.userId)
            this.bundles = this.bundles.filter(b => b.id != paymentRecord.bundleId)
        })
      }),
      error: (error: any) => console.log(error),
      complete: ():void => {            
        this.bundleButtonStatus = new Array(this.bundles.length).fill(false);
        this.checkBundleButtonStatus();
      }}
  )}


  getBundleTours(bundle: Bundle){
    this.toursInBundle = []
    bundle.toursId.forEach(id => {
      this.toursInBundle.push(this.allTours.filter(t => t.id == id)[0])
    });
    return this.toursInBundle;
  }
  getBundleToursBorderStyle(j: number){
    let borderRadius = '0 0 0 0';

    if(j===0)
      borderRadius = '25px 0 0 25px';
    else if(j === this.toursInBundle?.length-1)
      borderRadius = '0 25px 25px 0'; 

    return borderRadius;
  }

  checkButtonStatus(): void{
    this.buttonStatus = new Array(this.toursDisplay.length).fill(false);
    const items = this.cartService.getCurrentValue().itemsInCart
    this.toursDisplay.forEach((tour,index) => {
      console.log(index, tour.id);
      if(items.find((t) => t.id === tour.id))
      {
        this.buttonStatus[index] = true;
      }

    });

  }

  checkBundleButtonStatus(): void{
    const items = this.cartService.getCurrentValue().itemsInCart
    this.bundles.forEach((bundle, index) => {
      if(items.find(t => t.bundleId == bundle.id)){
        this.bundleButtonStatus[index] = true;
      }
    })
  }

  toggleContent() {
    this.showTourDetails = !this.showTourDetails;
  }

  getFirstTourKeypointById(id?: number): void{
    this.service.getTourKeyPointsByTourId(id).subscribe({
      next:(result: TourKeyPoints[])=>{
        this.keypoints = result;
        this.firstKeyPoint = this.keypoints[0];
        this.toggleContent();
      }
    });
  }

  addToCart(tour: Tour,index: number) {
    this.cartService.addToCart(tour);
    this.buttonStatus[index] = true;
  }

  handleButtonClick(event: Event, tour: Tour,index: number) {
    // Zaustavite propiranje klika kako ne bi došlo do roditeljskog (mat-card) klika
    event.stopPropagation();
    this.toastr.info('Item added to cart','Info');
    // Sada možete obaviti ostatak logike za klik na dugme unutar kartice
    this.addToCart(tour, index);
  }

  addToCartBundle(bundle: Bundle, index: number){
    this.bundleButtonStatus[index] = true;

    var i = 0;
    bundle.toursId.forEach(id => {
      const items = this.cartService.getCurrentValue().itemsInCart;

      if(!items.find(item => item.id == id)){

        let tour = this.allTours.filter(t => t.id == id)[0]
        tour.firstInBundle = (i == 0)? true : false;
        tour.bundleId = bundle.id;
        i++;
        this.toastr.info('Item added to cart','Info');
        this.cartService.addToCart(tour);
      }
    });

    this.checkButtonStatus();
  }

  displayToursByPreferences():void{
    this.marketService.getPreference().subscribe({
      next:(result : TourPreferences) => {
        if(result){
          this.preference = result;
          this.sortByPreferences();
          this.checkButtonStatus();
        }
        else{
          this.displayTours();
          this.checkButtonStatus();
        }
      },
      error: () =>{
        console.log(console.error())
      }
    })
  }

  sortByPreferences():void{
    // first push tours with preferences
    for(let t of this.preference.tags){
      for(let tour of this.tours){
        if(tour.tags.includes(t) && !this.toursDisplay.includes(tour)){
          this.toursDisplay.push(tour);
        }
      }
    }

    // then add those without preferences
    for(let tour of this.tours){
      if(!this.toursDisplay.includes(tour)){
        this.toursDisplay.push(tour);
      }
    }
  }

  openTourSearch(): void{
    const dialogRef = this.dialog.open(TourSearchMapComponent,{
      width: '70%',
      height: '85%'
      }).afterClosed().subscribe(result => {
        this.toursDisplay = []
        this.searchTours()
      });
  }

  searchTours() : void{
    this.getQueryParams()
    for(let t of this.tours){
      let searchKeyPoints : TourKeyPoints[] = []
      this.service.getTourKeyPointsByTourId(t.id).subscribe({
        next:(result: TourKeyPoints[])=>{
          searchKeyPoints = result
          if(this.checkSearchKeyPoints(searchKeyPoints)){
            this.toursDisplay.push(t)
          }
        }
      });
    }
  }

  getQueryParams():void{
    this.route.queryParams
    .subscribe(params => {
      if(Object.keys(params).length){
        this.lat = params['lat']
        this.lon = params['lon']
        this.radius = params['radius']
      }
    });
  }

  checkSearchKeyPoints(keypoints : TourKeyPoints[]): boolean{
    let distance : number
    let earthRadius = 6371000
    let radiusInDegrees = this.radius*180/(Math.PI*earthRadius)

    for(let k of keypoints){
      distance = Math.sqrt(Math.pow(k.latitude - this.lat, 2) + Math.pow(k.longitude - this.lon, 2))
      if(distance <= radiusInDegrees){
        return true
      }
    }
    return false
  }

  refreshDisplay():void{
    this.toursDisplay = []
    this.displayTours()
    this.tourSearchComponent.refresh()
  }

  displayTours(): void{
    this.tours.forEach((tour) =>{
      this.toursDisplay.push(tour)
    })
  }

  tourShow(id: number): void {
    this.router.navigate(['/tour-details', id]);
  }
 
  updateToursDisplay(tours: Tour[]) {
    this.toursDisplay = [];
    for(let t of tours){
      this.toursDisplay.push(t);
    }
  }

  getBadgeColor(difficulty: number) {
    const tourDifficultyMap: { [key: number]: string } = {
      0: '#0a8754',
      1: '#255c99',
      2: 'orange',
      3: '#b3001b'
    };

    return difficulty in tourDifficultyMap ? tourDifficultyMap[difficulty] : '';
  }

  toursRadioButtonClick(){
    this.toursChecked = true;
  }

  bundelsRadioButtonClick() {
    this.toursChecked = false;
  }
}
