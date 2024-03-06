import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControl } from '@angular/forms';
import { Tour } from '../../tour-execution/model/tour-model';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignCreationFormComponent } from '../campaign-creation-form/campaign-creation-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-campaign-creation',
  templateUrl: './campaign-creation.component.html',
  styleUrls: ['./campaign-creation.component.css']
})
export class CampaignCreationComponent implements OnInit{
  tours : Tour[] = [];
  selectedTours : Tour[] = [];
  userId: number;

  totalCards: number;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;

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

  constructor(
    private service: TourAuthoringService,
    private executionService: TourExecutionService, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(): void{
    this.userId = this.authService.user$.getValue().id;

    this.getTours();
    this.cardsPerPage = 3;
  }

  getTours(): void {
    this.executionService.getPurchasedTours(this.userId).subscribe({
      next: (result => { 
        result.forEach( tour => {
          if(tour.authorId != this.authService.user$.getValue().id){
            this.tours.push(tour);
          }
        })
        //this.tours = result; 
        this.totalCards = this.tours.length;  
        this.initializeSlider();
      }),
      error: (error: any) => console.log(error)
    })
  }

  selectTour(tour : Tour):void{
    this.selectedTours.push(tour);
    const tours = this.tours.filter(t => t.id !== tour.id);
    if(this.currentTourIndex >= tours.length){
      this.currentTourIndex = 0;
    }
    this.tours = tours;
    console.log(this.tours);
  }
  currentTourIndex = 0;
  showNextTour() {
    this.currentTourIndex = (this.currentTourIndex + 1) % this.tours.length;
  }
  showPreviousTour() {
    this.currentTourIndex = (this.currentTourIndex - 1 + this.tours.length) % this.tours.length;
  }

  removeSelectedTourFromList(tourToRemove : Tour) : void{
    for(let i in this.selectedTours){
      if(this.selectedTours[i].id === tourToRemove.id){
        this.selectedTours.splice(Number(i), 1);
      }
    }

    this.tours.push(tourToRemove);
  }

  onCancel(): void{
    this.router.navigate(['bought-tours']);
  }

  // prikaz tura u panelu
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);

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

  onCreate(): void{
    if(this.selectedTours.length < 2){
      this.toastr.warning('You have to pick atleast 2 tours!','Warning');
    }else{
      const dialogRef = this.dialog.open(CampaignCreationFormComponent, {
        data: { tours: this.selectedTours }
      });
    }
  }

  goToTours(): void {
    this.router.navigate(['/tours']);
  }

}
