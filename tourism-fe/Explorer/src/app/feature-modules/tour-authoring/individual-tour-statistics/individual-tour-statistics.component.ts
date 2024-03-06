import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourAuthoringService } from '../tour-authoring.service';
import { Subscription } from 'rxjs';
import { Tour, TourDifficulty } from '../model/tour.model';
import { TourStatistics } from '../model/tour-statistics.model';
import Chart from 'chart.js/auto';
import { TourRating } from '../../marketplace/model/tourrating.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'xp-individual-tour-statistics',
  templateUrl: './individual-tour-statistics.component.html',
  styleUrls: ['./individual-tour-statistics.component.css']
})
export class IndividualTourStatisticsComponent implements OnInit{
  private tourId: Subscription;
  tour: Tour;
  tourDifficulty = TourDifficulty;
  categories : string[];
  boughtToursStats : TourStatistics[] = [];
  numberCompleted : number = 0;
  numberActive : number = 0;
  numberAbandoned : number = 0;
  numberBought : number = 0;
  numberStartedTour: number = 0;
  numberTourRating : number =0;
  tourRatings: TourRating[] = [];
  originalTourRatings: TourRating[] = [];
  tourGrade: number = 0;
  sortOption: string = 'latest';
  selectedRating: string;
  dontShowStatistics: boolean = false;
  completionPerctange : number[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: TourAuthoringService
  ) {}
  
  ngOnInit(): void {
    this.tourId = this.route.params.subscribe((params) => {
      
      this.getTour(params['id']);
      this.getCompletedActiveAbandoned(params['id']);
      this.getNumberSessionsByTour(params['id']);
      this.getBought(params['id']);
      this.getCompletedActiveAbandoned(params['id']);     
      this.getRatingsByTourIdForAuthor(params['id']);
      
    });
    
  }

  getTour(id: number): void {
    this.service.getTour(Number(id)).subscribe({
      next: (result: Tour) => {
        this.tour = result;
        this.getCompletionPerctange();
        this.setCategories();
        this.setDifficultyColor();
      },
      error: (error: any) => console.log(error)
    });
  }

  getRatingsByTourIdForAuthor(tourid: number): void {
    this.service.getRatingsByTourIdForAuthor(Number(tourid)).subscribe({
      next: (result: TourRating[]) => {
        this.tourRatings = result.sort((objA, objB) => {
          const dateA = new Date(objA.dateOfCommenting);
          const dateB = new Date(objB.dateOfCommenting);
          return dateB.getTime() - dateA.getTime();});

        this.originalTourRatings = [...this.tourRatings];
        
        this.numberTourRating = this.tourRatings.length;

        this.calculateTourGrade();
      },
      error: () => {},
    });
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


  setCategories(): void {
    this.categories = this.tour.tags;
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

  getAverageStarsArray(averageGrade: number): number[]{
    if(averageGrade >= 4.75)
      return Array(5);
    if(averageGrade >= 3.75)
      return Array(4);
    if(averageGrade >= 2.75)
      return Array(3);
    if(averageGrade >= 1.75)
      return Array(2);
    if(averageGrade >= 0.75)
      return Array(1);
    return Array(0);
  }

  getAverageStarsHalfFillArray(averageGrade: number): number[]{
    const num = averageGrade % 1;
    if(num >0.25 && num < 0.75){
      return Array(1);
    }
    return Array(0);
  }

  getAverageStarsWithoutFillArray(averageGrade: number): number[]{
    if(averageGrade <= 0.25)
      return Array(5);
    if(averageGrade <= 1.25)
      return Array(4);
    if(averageGrade <= 2.25)
      return Array(3);
    if(averageGrade <= 3.25)
      return Array(2);
    if(averageGrade <= 4.25)
      return Array(1);
    return Array(0);
  }

  getCompletedActiveAbandoned(id : number): void{
    this.service.getSessionsByStatusForTourStatistics(id,1).subscribe({
      next: (result: TourStatistics) => {
        this.numberCompleted = result.numberOfStats;  
        this.service.getSessionsByStatusForTourStatistics(id,0).subscribe({
          next: (result: TourStatistics) => {
            this.numberActive = result.numberOfStats;  
            this.service.getSessionsByStatusForTourStatistics(id,2).subscribe({
              next: (result: TourStatistics) => {
                this.numberAbandoned = result.numberOfStats;                  
                if(this.numberAbandoned != 0 || this.numberActive != 0 || this.numberCompleted != 0)
                  this.createChart();    
              },
              error: (error: any) => console.log(error)
            });  

          },
          error: (error: any) => console.log(error)
        });
      },
      error: (error: any) => console.log(error)
    })
  }


  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: [
          'Abandoned',
          'Completed',
          'Active',
        ],
        datasets: [{
          label: 'The current status on this tour:',
          data: [this.numberAbandoned, this.numberCompleted, this.numberActive],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'The current status on this tour:',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {  
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }


  getBought(id : number): void{
    this.service.getSoldToursStatistics().subscribe({
      next: (result: TourStatistics[]) => {
        this.boughtToursStats = result;    
        const foundTour: TourStatistics | undefined = this.boughtToursStats.find(stat => stat.tourId == id);
        
        if (foundTour) {
          
          this.numberBought = foundTour.numberOfStats;
        } else {
          this.dontShowStatistics = true;
          console.log(`TourStatistic with id ${id} not found.`);
        }
      } 
    })
  }

  getNumberSessionsByTour(id : number): void{
    this.service.getNumberSessionByTour(id).subscribe({
      next: (result: TourStatistics) => {
       this.numberStartedTour = result.numberOfStats;
      },error: (error: any) => console.log(error)
    })
  }

  onOptionChange(selectedValue: string): void {
    this.sortOption = selectedValue;
    this.sortedRatings(this.sortOption);
  }

  sortedRatings(sortOpt : string): void{
    if(sortOpt == 'latest'){
      this.tourRatings = this.tourRatings.sort((objA, objB) => {
        const dateA = new Date(objA.dateOfCommenting);
        const dateB = new Date(objB.dateOfCommenting);
        return dateB.getTime() - dateA.getTime();});
    }else if (sortOpt === 'oldest') {
      this.tourRatings = this.tourRatings.sort((objA, objB) => {
        const dateA = new Date(objA.dateOfCommenting);
        const dateB = new Date(objB.dateOfCommenting);
        return dateA.getTime() - dateB.getTime();
      });
    }else if (sortOpt === 'best') {
      this.tourRatings = this.tourRatings.sort((objA, objB) => {
        return objB.mark - objA.mark;
      });
    }else if (sortOpt === 'bad') {
      this.tourRatings = this.tourRatings.sort((objA, objB) => {
        return objA.mark - objB.mark;
      });
    }
  }

  updateSelectedRating(value: string) {
    this.selectedRating = value;
    this.tourRatings = [...this.originalTourRatings];

    if(this.selectedRating == '5-star'){
      this.tourRatings = this.tourRatings
      .filter(rating => rating.mark === 5);
    }else if(this.selectedRating == '4-star'){
      this.tourRatings = this.tourRatings
      .filter(rating => rating.mark === 4);
    }else if(this.selectedRating == '3-star'){
      this.tourRatings = this.tourRatings
      .filter(rating => rating.mark === 3);
    }else if(this.selectedRating == '2-star'){
      this.tourRatings = this.tourRatings
      .filter(rating => rating.mark === 2);
    }else if(this.selectedRating == '1-star'){
      this.tourRatings = this.tourRatings
      .filter(rating => rating.mark === 1);
    }
  }

  getCompletionPerctange(): void{
    for(let kp of this.tour.keyPoints){
      this.service.getPercentCompletedKeyPointOnTour(this.tour.id!,kp.id!).subscribe({
        next: (result: TourStatistics) => { 
          this.completionPerctange.push(+result.numberOfStats.toFixed(2));
          console.log(this.completionPerctange);
          this.completionPerctange.sort((a, b) => b -a)  
        },
        error: (error: any) => console.log(error)
      })
    }   
  }

}
