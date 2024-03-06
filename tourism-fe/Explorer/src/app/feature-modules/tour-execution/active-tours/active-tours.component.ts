import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour-model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourExecutionService } from '../tour-execution.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ShoppingCartService } from '../../marketplace/shopping-cart/shopping-cart.service';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { PaymentRecord } from '../../marketplace/model/payment-record.model';
import { TourPreferences } from '../../marketplace/model/tour-preferences.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TourDifficulty } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-active-tours',
  templateUrl: './active-tours.component.html',
  styleUrls: ['./active-tours.component.css'],
})

export class ActiveToursComponent implements OnInit{
  activeTours: Tour[] = []
  allTours: Tour[] = []
  user: User 
  keypoints: TourKeyPoints[]
  firstKeyPoint: TourKeyPoints
  buttonStatus: boolean[]
  userId: number
  paymentRecords: PaymentRecord[] = []
  tourDifficulty = TourDifficulty;

  constructor(private service: TourExecutionService,
    private cartService: ShoppingCartService,
    private marketService: MarketplaceService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
    this.getTours();
  }

  getTours(): void {
    const userId = this.userId;

    this.service.getPurchasedTours(userId).subscribe(purchasedTours => {
      const purchasedTourIds = purchasedTours.map(tour => tour.id);

      this.service.getUsedTours(userId).subscribe(usedTours => {
        const usedTourIds = usedTours.map(tour => tour.id);

        this.service.getActiveTours(userId).subscribe({
          next: (result: PagedResults<Tour>) => {
            this.allTours = result.results;

            this.activeTours = this.allTours.filter(tour =>
              !purchasedTourIds.includes(tour.id) &&
              !usedTourIds.includes(tour.id)
            ).slice(0,10);
            this.buttonStatus = new Array(this.activeTours.length).fill(false);
            this.checkButtonStatus();
          },
          error: (error: any) => console.log(error),
        });
      });
    });
  }

  checkButtonStatus(): void{
    this.buttonStatus = new Array(this.activeTours.length).fill(false);
    const items = this.cartService.getCurrentValue().itemsInCart
    this.activeTours.forEach((tour,index) => {
      console.log(index, tour.id);
      if(items.find((t) => t.id === tour.id))
      {
        this.buttonStatus[index] = true;
      }

    });

  }

  getFirstTourKeypointById(id?: number): void{
    this.service.getTourKeyPointsByTourId(id).subscribe({
      next:(result: TourKeyPoints[])=>{
        this.keypoints = result;
        this.firstKeyPoint = this.keypoints[0];
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

  tourShow(id: number): void {
    this.router.navigate(['/tour-details', id]);
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
 
}


