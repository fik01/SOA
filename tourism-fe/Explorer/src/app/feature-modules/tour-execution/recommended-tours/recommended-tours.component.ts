import { Component } from '@angular/core';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { TourExecutionService } from '../tour-execution.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Tour } from '../model/tour-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from '../../marketplace/shopping-cart/shopping-cart.service';
import { TourDifficulty } from '../../tour-authoring/model/tour.model';

@Component({
  selector: 'xp-recommended-tours',
  templateUrl: './recommended-tours.component.html',
  styleUrls: ['./recommended-tours.component.css']
})
export class RecommendedToursComponent {
  keypoints: TourKeyPoints[] = []
  firstKeyPoint: TourKeyPoints
  userId: number
  toursDisplay: Tour[] = []
  buttonStatus: boolean[]
  tourDifficulty = TourDifficulty;

  constructor(private service: TourExecutionService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private cartService: ShoppingCartService){}

  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
    this.getTours();
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

  getTours(){
    this.service.getRecommendedTours(this.userId).subscribe({
      next: (result => {
        this.toursDisplay = result.results.slice(0, 10);
        this.buttonStatus = new Array(this.toursDisplay.length).fill(false);
        this.checkButtonStatus();
      }),
      error: (error: any) => console.log(error)
    })
  }

  checkButtonStatus(): void{
    this.buttonStatus = new Array(this.toursDisplay.length).fill(false);
    const items = this.cartService.getCurrentValue().itemsInCart
    this.toursDisplay.forEach((tour,index) => {
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
      },
      error: (error: any) => console.log(error)
    });
  }

  tourShow(id: number): void {
    this.router.navigate(['/tour-details', id]);
  }

  handleButtonClick(event: Event, tour: Tour,index: number) {
    event.stopPropagation();
    this.toastr.info('Item added to cart','Info');
    this.addToCart(tour, index);
  }

  addToCart(tour: Tour,index: number) {
    this.cartService.addToCart(tour);
    this.buttonStatus[index] = true;
  }
}
