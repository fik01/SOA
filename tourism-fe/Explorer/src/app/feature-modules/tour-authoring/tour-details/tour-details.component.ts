import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour, TourDifficulty } from '../model/tour.model';
import { TourKeyPoints } from '../model/tour-keypoints.model';
import { TourRating } from '../../marketplace/model/tourrating.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Session } from '../../tour-execution/model/position-simulator.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TourRecommendationComponent } from '../../layout/tour-recommendation/tour-recommendation.component';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'xp-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  hiddenElements: NodeListOf<HTMLElement>;
  private tourId: Subscription;
  tour: Tour;
  firstKeyPoint: TourKeyPoints;
  categories: string[];
  tourGrade: number = 0;
  tourRatings: TourRating[];
  noTourRatings: boolean = false;
  validForTouristComment = false;
  validForTouristUpdateComment = false;
  validForForm = false;
  personId : number;
  tourRating : TourRating;
  session: Session;
  tourDifficulty = TourDifficulty;

  tourratingForm=new FormGroup({
    grade: new FormControl('',[Validators.required]),
    comment: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private service: TourAuthoringService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-main');
      } else {
        entry.target.classList.remove('show-main');
      }
    });
  });

  ngOnInit() {
    this.personId = this.authService.user$.getValue().id;
    this.hiddenElements = document.querySelectorAll('.hidden');
    this.hiddenElements.forEach((el) => this.observer.observe(el));
    this.tourId = this.route.params.subscribe((params) => {
      this.getTour(params['id']);
      this.getFirstKeyPointByTourId(params['id']);
      this.getRatingsByTourId(params['id']);
    
    });
  }
  ngOnDestroy() {
    this.tourId.unsubscribe();
  }

  

  ngAfterViewInit() {
    if (this.mapComponent) {
      this.mapComponent.addMarker(
        this.firstKeyPoint.latitude,
        this.firstKeyPoint.longitude
      );

      this.mapComponent.setView(
        this.firstKeyPoint.latitude,
        this.firstKeyPoint.longitude,
        13
        );
    } else {
      console.error('MapComponent još uvek nije definisan u ngAfterViewInit.');
    }
  }
  

  getRatingsByTourId(tourid: number): void {
    this.service.getRatingsByTourId(Number(tourid)).subscribe({
      next: (result: TourRating[]) => {
        this.tourRatings = result.sort((objA, objB) => {
          const dateA = new Date(objA.dateOfCommenting);
          const dateB = new Date(objB.dateOfCommenting);
          return dateB.getTime() - dateA.getTime();});
        if(this.tourRatings.length == 0){
          this.noTourRatings = true;
        }

        for (const rating of this.tourRatings){
          if(rating.personId == this.authService.user$.getValue().id){
            this.tourRating = rating;
          }
        }
        this.calculateTourGrade();

        this.service.getSesionByTourAndTouristId(Number(tourid), this.authService.user$.getValue().id).subscribe({
          next: (result  => {
            this.session = result;
            if(this.session && this.session.id != undefined){
              this.service.getValidForTouristComment(this.session.id).subscribe({
                next: (result => {
                  const shouldAskQuestion = result;

                  if(this.tourRating !== undefined && shouldAskQuestion){
                    this.showNotificationForUpdate();
                  }else if (shouldAskQuestion) {
                    this.showNotificationForComment();
                  }
                })

              });
            }
          }),
          error : () => {},
        });
      },
      error: () => {},
    });
  }

  getTour(id: number): void {
    this.service.getTourForTourist(Number(id)).subscribe({
      next: (result: Tour) => {
        this.tour = result;
        this.setCategories();
        this.setDifficultyColor();
      },
      error: () => {},
    });
  }

  getFirstKeyPointByTourId(tourId: number): void {
    this.service.getFirstKeyPointByTourId(tourId).subscribe({
      next: (result: TourKeyPoints[]) => {
        this.firstKeyPoint = result[0];
      },
      error: () => {},
    });
  }

  setCategories(): void {
    this.categories = this.tour.tags;
  }

  calculateTourGrade(): void {
    if (this.tourRatings.length === 0) {
      this.tourGrade = 0;
    } else {
      const totalMarks = this.tourRatings.reduce(
        (sum, rating) => sum + rating.mark,
        0
      );

      function round(num: number): number {
        return Math.round(num * 100) / 100;
      }

      this.tourGrade = round(totalMarks / this.tourRatings.length);
    }
  }

  setDifficultyColor(): void {
    const difficultyBtn: HTMLElement | null =
      document.querySelector('.difficulty');
    switch (this.tour.difficulty) {
      case TourDifficulty.Beginner:
        difficultyBtn?.classList.add('bg-success');
        break;
      case TourDifficulty.Intermediate:
        difficultyBtn?.classList.add('bg-info');
        break;
      case TourDifficulty.Advanced:
        difficultyBtn?.classList.add('bg-warning');
        break;
      case TourDifficulty.Pro:
        difficultyBtn?.classList.add('bg-danger');
        break;
    }
  }

  getStarsArray(grade: number): number[] {
    return new Array(grade);
  }

  showNotificationForComment() {
    const dialogRef = this.snackBar.open('Do you want to leave a review for the tour,you have fulfilled all the necessary requirements for it?', 'Yes', {
      duration: 8000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top', 
      
    });
    dialogRef.onAction().subscribe(() => {
      this.showFormForComment();
    });
  }
  
  showFormForComment() {
    this.validForForm = true;
    this.validForTouristComment = true;
    window.scrollTo(0, document.body.scrollHeight);
  }

  closeForm(): void{
    this.validForTouristComment = false;
    this.validForForm = false;
    this.validForTouristUpdateComment = false;
  }

  addTourRating(): void {
    if(this.validate()){
      this.personId = this.authService.user$.getValue().id;

    const tourrating: TourRating = {
      personId : this.personId,
      tourId : this.tour.id,
      mark: parseInt(this.tourratingForm.value.grade || ""),
      comment: this.tourratingForm.value.comment || "",
      dateOfVisit : this.session.lastActivity, 
      dateOfCommenting : new Date(),
      images : []

    };

    const imageUris = this.tourratingForm.value.image;
    const images = imageUris?.split(','); 
    if (images) {
      images.forEach(imageUri => {
      tourrating.images.push(imageUri);
      });
    }

    this.service.addTourRating(tourrating).subscribe({
      next: () => {
        this.toastr.success('Tour rating added','Success');
        this.validForTouristComment = false;
        this.validForForm = false;
        this.ngOnInit();
      },
        error: () =>{
          this.toastr.error('There was an error while trying to add tour rating','Error');
        }
    });
    }   
  }

  private validate(): boolean {
    if (!this.tourratingForm.value.grade) {
      this.toastr.warning('Grade must not be empty','Warning');
      return false;
    }
    if (!this.tourratingForm.value.comment) {
      this.toastr.warning('Comment must not be empty','Warning');
      return false;
    }
    if (!this.tourratingForm.value.image) {
      
      this.toastr.warning('Comment must not be empty','Warning');
      return false;
    }
    return true;  
  }

  showNotificationForUpdate() {
    const dialogRef = this.snackBar.open('Since you have already left a review for this tour, would you like to modify it', 'Yes', {
      duration: 8000, 
      horizontalPosition: 'end',
      verticalPosition: 'top', 
      
    });
    dialogRef.onAction().subscribe(() => {
      this.showFormForUpdate();
    });
  }

  showFormForUpdate() {
    this.validForForm = true;
    this.validForTouristUpdateComment = true;
    window.scrollTo(0, document.body.scrollHeight);

    this.tourratingForm.patchValue({
      grade: String(this.tourRating.mark),
      comment: this.tourRating.comment,
      image: this.tourRating.images.join(', ')
    });
  }

  updateTourRating(): void{
    if(this.validate()){
      this.tourRating.mark = parseInt(this.tourratingForm.value.grade || "");
      this.tourRating.comment = this.tourratingForm.value.comment || "";

      this.tourRating.images.splice(0, this.tourRating.images.length);
      const imageUris = this.tourratingForm.value.image;
      const images = imageUris?.split(','); 
      if (images) {
        images.forEach(imageUri => {
        this.tourRating.images.push(imageUri);
        });
      }

      this.service.updateTourRating(this.tourRating).subscribe({
        next: () => {
          this.validForTouristUpdateComment = false;
          this.validForForm = false;
          this.toastr.success('Tour rating updated','Success');
          this.ngOnInit();
        },
        error: () =>{
          this.toastr.error('There was an error while trying to update tour rating','Error');
        }
      });
    }
  }

  isPersonIdInTourRatings(): boolean {
    return this.tourRatings.filter(t => t.personId == this.personId).length != 0 ? true : false;
  }

  showTourRecommendations(){
    const dialogRef = this.dialog.open(TourRecommendationComponent, {
      width: '80vw',
      height: '90vh',
      data: { tourId: this.tour.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      document.body.classList.remove('blur-background');
    });
  }
}
