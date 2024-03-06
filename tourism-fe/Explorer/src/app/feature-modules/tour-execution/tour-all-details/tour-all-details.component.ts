import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Tour } from '../model/tour-model';
import { TourDifficulty } from '../../tour-authoring/model/tour.model';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourRating } from '../../marketplace/model/tourrating.model';
import { PositionSimulator, Session } from '../model/position-simulator.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourExecutionService } from '../tour-execution.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TourProblemFormComponent } from '../tour-problem-form/tour-problem-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour-all-details',
  templateUrl: './tour-all-details.component.html',
  styleUrls: ['./tour-all-details.component.css']
})
export class TourAllDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  hiddenElements: NodeListOf<HTMLElement>;
  private tourId: Subscription;
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
    archivedDate: null
  };
  firstKeyPoint: TourKeyPoints;
  categories: string[];
  tourGrade: number = 0;
  tourRatings: TourRating[];
  keyPoints: TourKeyPoints[] = [];
  selectedKeyPoint: TourKeyPoints | null = null;
  selectedKeyPointIndex: number = 0;
  session: Session;
  userId: number;
  tourDifficulty = TourDifficulty;
  validForTouristComment = false;
  validForTouristUpdateComment = false;
  validForForm = false;
  personId : number;
  tourRating : TourRating;
  sessionForAlways : Session = {
    touristId: 0,
    locationId: 0,
    lastActivity: new Date(),
    completedKeyPoints: [],
    tourId: 0,
    sessionStatus: 0,
    transportation: 0
  }

  tourratingForm=new FormGroup({
    grade: new FormControl('',[Validators.required]),
    comment: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private service: TourAuthoringService,
    private ExecutionService: TourExecutionService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private toastr: ToastrService
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
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0,0);
      }
    })
    this.userId = this.authService.user$.getValue().id;

    this.hiddenElements = document.querySelectorAll('.hidden');
    this.hiddenElements.forEach((el) => this.observer.observe(el));
    this.tourId = this.route.params.subscribe((params) => {
      this.getTour(params['id']);
      this.getTourKeyPointsByTourId(params['id']);
      this.getRatingsByTourId(params['id']);
    });
  }
  ngOnDestroy() {
    this.tourId.unsubscribe();
  }

  getRatingsByTourId(tourid: number): void {
    this.service.getRatingsByTourId(Number(tourid)).subscribe({
      next: (result: TourRating[]) => {
        this.tourRatings = result.sort((objA, objB) => {
          const dateA = new Date(objA.dateOfCommenting);
          const dateB = new Date(objB.dateOfCommenting);
          return dateB.getTime() - dateA.getTime();});

        for (const rating of this.tourRatings){
          if(rating.personId == this.authService.user$.getValue().id){
            this.tourRating = rating;
          }
        }
        this.calculateTourGrade();

      },
      error: () => {},
      complete: (): void => { this.getSessionForAlways(tourid)}
    });
  }

  getSessionForAlways(tourid: Number) : void{
    this.service.getSesionByTourAndTouristId(Number(tourid), this.authService.user$.getValue().id).subscribe({
      next: (result  => {
        this.sessionForAlways = result;
        if(this.sessionForAlways && this.sessionForAlways.id != undefined){
          this.service.getValidForTouristComment(this.sessionForAlways.id).subscribe({
            next: (result => {
              const shouldAskQuestion = result;

              if(this.tourRating !== undefined && shouldAskQuestion){
                //this.showNotificationForUpdate();
              }else if (shouldAskQuestion) {
                //this.showNotificationForComment();
              }
            })

          });
        }
      }),
      error : () => {},
    });
  }

  getTour(id: number): void {
    this.ExecutionService.getTour(Number(id)).subscribe({
      next: (result: Tour) => {
        this.tour = result;
        this.setCategories();
        this.setDifficultyColor();
      },
      error: (error: any) => console.log(error),
      complete: (): void => { this.getSession() }
    });
  }

  getTourKeyPointsByTourId(tourId: number): void {
    this.ExecutionService.getTourKeyPointsByTourId(tourId).subscribe({
      next: (result: TourKeyPoints[]) => {
        this.keyPoints = result;

        if (this.keyPoints.length > 0) {
          this.selectedKeyPoint = this.keyPoints[0];
          this.mapComponent.addMarker(
            this.selectedKeyPoint.latitude,
            this.selectedKeyPoint.longitude
          );
          this.mapComponent.setView(
            this.selectedKeyPoint.latitude,
            this.selectedKeyPoint.longitude,
            13
            );
        }
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

  showNextKeyPoint() {
    if (this.keyPoints.length > 0) {
      this.mapComponent.clearMarkers();
  
      if (this.selectedKeyPointIndex < this.keyPoints.length - 1) {
        this.selectedKeyPointIndex++;
      } else {
        this.selectedKeyPointIndex = 0; 
      }
  
      this.selectedKeyPoint = this.keyPoints[this.selectedKeyPointIndex];

      this.mapComponent.addMarker(
        this.selectedKeyPoint.latitude,
        this.selectedKeyPoint.longitude
      );
      this.mapComponent.setView(
        this.selectedKeyPoint.latitude,
        this.selectedKeyPoint.longitude,
        13
        );
    }
  }

  startTour(tourId: number) {
    this.router.navigate(['/map-view'], {queryParams: {tourId: tourId}});
  }

  viewTourProggres(): void{
    this.router.navigate(['/map-view']);
  } 

  getSession(): void {
    this.ExecutionService.getActiveSessionByTouristId(this.userId).subscribe({
      next: (result => this.session = result),
      error: (error: any) => console.log(error),
      complete: (): void => { }
    }) 
  }  


  getStarsArray(grade: number): number[] {
    return new Array(grade);
  }

  // showNotificationForComment() {
  //   const dialogRef = this.snackBar.open('Do you want to leave a review for the tour,you have fulfilled all the necessary requirements for it?', 'Yes', {
  //     duration: 8000, 
  //     horizontalPosition: 'end', 
  //     verticalPosition: 'top', 
      
  //   });
  //   dialogRef.onAction().subscribe(() => {
  //     this.showFormForComment();
  //   });
  // }
  
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
      tourId : this.tour!.id,
      mark: parseInt(this.tourratingForm.value.grade || ""),
      comment: this.tourratingForm.value.comment || "",
      dateOfVisit : this.sessionForAlways.lastActivity, 
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
        this.toastr.success('Rating added','Success');
        this.validForTouristComment = false;
        this.validForForm = false;
        this.ngOnInit();
      },
        error: () =>{
          this.toastr.error('There was an error while trying to add a rating','Error');
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

  // showNotificationForUpdate() {
  //   const dialogRef = this.snackBar.open('Since you have already left a review for this tour, would you like to modify it', 'Yes', {
  //     duration: 8000, 
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: 'my-snackbar'
  //   });
  //   dialogRef.onAction().subscribe(() => {
  //     this.showFormForUpdate();
  //   });
  // }

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
          this.toastr.success('Rating updated','Success');
          this.validForTouristUpdateComment = false;
          this.validForForm = false;;
          this.ngOnInit();
        },
        error: () =>{
          this.toastr.error('There was an error while trying to update a rating','Error');
        }
      });
    }
  }
  openTourProblemDialog(): void{
    const dialogRef = this.dialog.open(TourProblemFormComponent, {
      width: '50%',
      height: '90%',
      data:{tourId: this.tour!.id}
    })
  }
}
