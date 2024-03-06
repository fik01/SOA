import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Tour } from '../../tour-execution/model/tour-model';
import { ShoppingCartService } from '../../marketplace/shopping-cart/shopping-cart.service';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent } from '../profile/profile.component';
import { TourRecommenationDialogComponent } from 'src/app/shared/dialogs/tour-recommenation-dialog/tour-recommenation-dialog.component';
import { TourDetailsComponent } from '../../tour-authoring/tour-details/tour-details.component';

@Component({
  selector: 'xp-tour-recommendation',
  templateUrl: './tour-recommendation.component.html',
  styleUrls: ['./tour-recommendation.component.css']
})
export class TourRecommendationComponent implements OnInit {
  user: User;
  tourId: number;
  tours: Tour[];
  buttonStatus: boolean[];
  keypoints: TourKeyPoints[]
  firstKeyPoint: TourKeyPoints;
  isPopupVisible = false;


  constructor(public dialogRef: MatDialogRef<TourRecommenationDialogComponent>,
              public dialogRef1: MatDialogRef<TourDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tourId: number },
              private authService: AuthService,
              private layoutService: LayoutService,
              private cartService: ShoppingCartService,
              private service: TourExecutionService,
              private router: Router,
              private toastr: ToastrService) {
                this.tourId = data.tourId;
            }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next:(user => {
        this.user = user;

        this.layoutService.GetRecommendedTourFromFollowings(this.tourId, this.user.id).subscribe({
          next: (result => this.tours = result.results),
          error: (error: any) => console.log(error),
          complete: (): void => {
            this.buttonStatus = new Array(this.tours.length).fill(false);
            this.checkButtonStatus();
          }
        })
      }),
      error: (error: any) => console.log(error),
      complete: ():void => {
        
      }
    })
    
  }
  @Input() currentRate = 0;
  @Output() rateChange = new EventEmitter<number>();

  stars = Array(5).fill(0);

  rate(rating: number): void {
    this.currentRate = rating;
    this.rateChange.emit(rating);

    this.layoutService.GetFilteredRecommendedTour(this.tourId, this.user.id,rating).subscribe({
      next: (result => {
        this.tours = result.results
      }),
      error: (error: any) => console.log(error),
      complete: (): void => {
            this.buttonStatus = new Array(this.tours.length).fill(false);
            this.checkButtonStatus();
          }
        
    })
  }

  
  checkButtonStatus(): void{
    this.buttonStatus = new Array(this.tours.length).fill(false);
    const items = this.cartService.getCurrentValue().itemsInCart
    this.tours.forEach((tour,index) => {
      if(items.find((t) => t.id === tour.id))
      {
        this.buttonStatus[index] = true;
      }

    });

  }
  links:string='';
  sendEmail():void{
    this.links='';
    this.tours.forEach(e => {
      this.links += `http://localhost:4200/tour-details/${e.id}|`;
    });
    this.layoutService.SendEmail(this.user.id, this.links).subscribe();
  }
  getFirstTourKeypointById(id?: number): void{
    this.service.getTourKeyPointsByTourId(id).subscribe({
      next:(result: TourKeyPoints[])=>{
        this.keypoints = result;
        this.firstKeyPoint = this.keypoints[0];
      }
    });
  }

  tourShow(id: number): void {
    this.dialogRef.close();
    this.router.navigate(['/tour-details', id]);
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
}
