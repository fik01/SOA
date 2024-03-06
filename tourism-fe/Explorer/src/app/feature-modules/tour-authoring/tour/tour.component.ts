import { Component, OnInit } from '@angular/core';
import { Tour, TourDifficulty, TourStatus } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourKeypointsComponent } from '../tour-keypoints/tour-keypoints.component';
import { PublicTourKeypointsComponent } from '../public-tour-keypoints/public-tour-keypoints.component';
import { PublicFacilitiesComponent } from '../public-facilities/public-facilities.component';
import { MatDialog } from '@angular/material/dialog';
import { TourCreationComponent } from '../tour-creation/tour-creation.component';
import { TourDiscountSaleComponent } from '../tour-discount-sale/tour-discount-sale.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  tourDifficulty = TourDifficulty;
  tourStatus = TourStatus;

  tours: Tour[] = [];
  toggleForm: boolean = false;
  toggleEquipment: boolean = false;
  user: User | undefined;
  selectedTour: Tour;
  errorMessage: boolean = false;
  showDiscount: boolean = false;
  dialogOpen: boolean = true;
  discountPercentage: number;
  noTours: boolean = false;

  windowScrolled: boolean;

  constructor(
    private service: TourAuthoringService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.getTours();

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  getTours(): void {
    this.service.getToursByAuthorId(this.user?.id??-100).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
        if(this.tours.length == 0){
          this.noTours = true;
        }
      }
    });
  }

  openAddTourForm(): void {
    const dialogRef = this.dialog.open(TourCreationComponent,{

    });
  }
  
  openAddPublicKeyPoint(): void {
    const dialogRef = this.dialog.open(PublicTourKeypointsComponent, {
      width: '50%', 
      height: '90%'
    });
  }
  openAddPublicFacilitiy(): void {
    const dialogRef = this.dialog.open(PublicFacilitiesComponent, {
      width: '50%', 
      height: '90%'
    });
  }

  openTourView(tourId: number): void{
    this.router.navigate(['tour-creation-form', tourId, '1']);
  }
  
  archiveTour(selectedTour: Tour): void{
    selectedTour.status = TourStatus.Archived
    selectedTour.archivedDate = new Date();
    this.errorMessage = false;
    this.service.archiveTour(selectedTour).subscribe({
      next: () => {
        this.toastr.success('Tour archived','Success');
      },
      error: () =>{
        this.toastr.error('There was an error while trying to archive a tour','Error');
      }
    });
  }

  publishTour(selectedTour: Tour): void{
    selectedTour.status = TourStatus.Published
    selectedTour.publishedDate = new Date();
    this.errorMessage = false;
    this.service.publishTour(selectedTour).subscribe({
      next: () => {
        this.toastr.success('Tour published','Success');
      },
      error: () =>{
        this.toastr.error('There was an error while trying to publish a tour','Error');
      }
    });
  }

  canBeArchived(tour: Tour): boolean{
    if(tour.status === TourStatus.Published){
      return true
    }
    return false;
  }

  canBePublished(tour: Tour): boolean{
    if(tour.status === TourStatus.Archived)
    {
      this.errorMessage = false;
      return true
    }
    else if(tour.status === TourStatus.Draft)
    {
      if(this.isValidForPublishing(tour))
      {
        this.errorMessage = false;
        return true;
      }
      else
      {
        this.errorMessage = true;
        return false;
      }
    }else{
      this.errorMessage = false;
      return false;
    }
  }

  isValidForPublishing(tour: Tour): boolean{
    return tour.price >= 0 && tour.name !== '' && tour.description !== '' && tour.difficulty !== null && tour.tags.length > 0 && tour.keyPoints.length >= 2 && tour.durations.length > 0;
  }

  showStatistics(id :number) : void{
    this.router.navigate(['/show-statistic', id]);
  }

  openDiscountSaleForm(event: Event, tour: Tour): void {

    event.stopPropagation();
    this.selectedTour = tour;
    const dialogRef = this.dialog.open(TourDiscountSaleComponent, {
      width: '30%',
      height: '60%',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.discountPercentage = result.discountPercentage;
        console.log('Popust iz pop-up prozora:', this.discountPercentage);
  
        this.dialogOpen = true;
        this.showDiscount = true;
      } else {
        this.dialogOpen = true;
        this.showDiscount = false;
      }
    });
  }  
}
