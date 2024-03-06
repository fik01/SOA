import { Component, OnInit } from '@angular/core';
import { Tour, TourDifficulty, TourStatus } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { TourStatistics } from '../model/tour-statistics.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import Chart from 'chart.js/auto';


@Component({
  selector: 'xp-overall-tour-statistics',
  templateUrl: './overall-tour-statistics.component.html',
  styleUrls: ['./overall-tour-statistics.component.css']
})

export class OverallTourStatisticsComponent implements OnInit {
  
  tours: Tour[] = [];
  attendedToursStats: TourStatistics[] = [];
  abandonedToursStats: TourStatistics[] = [];
  mostSoldToursStats: TourStatistics[] = [];
  bestRatedToursStats: TourStatistics[] = [];
  attendedTours: Tour[] = [];
  abandonedTours: Tour[] = [];
  mostSoldTours: Tour[] = [];
  bestRatedTours: Tour[] = [];
  tourStatus = TourStatus;
  tourDifficulty = TourDifficulty;
  user: User | undefined;
  authorsTours: Tour[] = [];
  soldToursNumber: number = 0;
  startedToursNumber: number = 0;
  completedToursNumber: number = 0;
  tourCompletionPercentageStats: number[] = []

  windowScrolled: boolean;
  
  constructor(
    private service: TourAuthoringService,
    private authService: AuthService          
    ) {}
  
  
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.getAuthorsTours()
    this.getNumberOfStartedToursByAuthorId();
    this.getNumberOfCompletedToursByAuthorId();
    this.getTourCompletionPercentageStats();

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  getTourCompletionPercentageStats(): void{
    this.service.GetTourCompletionPercentageStats(this.user?.id??0).subscribe({
      next: (result: number[]) => {
        this.tourCompletionPercentageStats = result;
        this.createChart()
      }
    })
  }

  getNumberOfStartedToursByAuthorId(): void{
    this.service.getNumberOfStartedToursByAuthorId(this.user?.id??0).subscribe({
      next: (result: number) => {
        this.startedToursNumber = result;
      }
    })
  }

  getNumberOfCompletedToursByAuthorId(): void{
    this.service.getNumberOfCompletedToursByAuthorId(this.user?.id??0).subscribe({
      next: (result: number) => {
        this.completedToursNumber = result;
      }
    })
  }

  getAuthorsTours(): void{
    this.service.getToursByAuthorId(this.user?.id??0).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.authorsTours = result.results;
        this.getAllTours();
      }
    })
  }

  getSoldToursNumber(): void{
    this.mostSoldToursStats.forEach(stat => {
      this.soldToursNumber += stat.numberOfStats
    })
  }

  getAllTours(): void{
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
        this.getAttendedToursStats();
        this.getAbandonedToursStats();
        this.getSoldToursStats();
        this.getBestRatedToursStats();
      }
    })
  }

  getAttendedToursStats(): void{
    this.service.getAttendanceStatistics().subscribe({
      next: (result: TourStatistics[]) => {
        this.attendedToursStats = result;
        this.showAttendedToursStats();
      } 
    })
  }

  getAbandonedToursStats(): void{
    this.service.getAbandonedStatistics().subscribe({
      next: (result: TourStatistics[]) => {
        this.abandonedToursStats = result;
        this.showAbandonedToursStats();
      } 
    })
  }

  getSoldToursStats(): void{
    this.service.getSoldToursStatistics().subscribe({
      next: (result: TourStatistics[]) => {
        this.mostSoldToursStats = result;
        this.showMostSoldToursStats();
      } 
    })
  }
  
  getBestRatedToursStats(): void{
    this.service.getBestRatedStatistics().subscribe({
      next: (result: TourStatistics[]) => {
        this.bestRatedToursStats = result;
        this.showBestRatedToursStats();
      }
    })
  }

  showAttendedToursStats(): void{
    let unfilteredAttendedToursStats = this.attendedToursStats
    this.attendedToursStats = unfilteredAttendedToursStats.filter(item => this.authorsTours.some((authorsTour) => authorsTour.id === item.tourId));
    this.attendedToursStats.sort((a, b) => b.numberOfStats - a.numberOfStats);
    
    for(let i=0; i < 3; i++){
      if(this.attendedToursStats[i]){
        let temp = this.tours.find(tour => tour.id === this.attendedToursStats[i].tourId);
        if(temp){
          this.attendedTours.push(temp);
        }
      }
    }

  }

  showAbandonedToursStats(): void{
    let unfilteredAbandonedToursStats = this.abandonedToursStats
    this.abandonedToursStats = unfilteredAbandonedToursStats.filter(item => this.authorsTours.some((authorsTour) => authorsTour.id === item.tourId));
    this.abandonedToursStats.sort((a, b) => b.numberOfStats - a.numberOfStats);

    for(let i=0; i < 3; i++){
      if(this.abandonedToursStats[i]){
        let temp = this.tours.find(tour => tour.id === this.abandonedToursStats[i].tourId);
        if(temp){
          this.abandonedTours.push(temp);
        }
      }
    }
  }

  showMostSoldToursStats(): void{
    let unfilteredMostSoldToursStats = this.mostSoldToursStats
    this.mostSoldToursStats = unfilteredMostSoldToursStats.filter(item => this.authorsTours.some((authorsTour) => authorsTour.id === item.tourId));
    this.mostSoldToursStats.sort((a, b) => b.numberOfStats - a.numberOfStats);

    for(let i=0; i < 3; i++){
      if(this.mostSoldToursStats[i]){
        let temp = this.tours.find(tour => tour.id === this.mostSoldToursStats[i].tourId);
        if(temp){
          this.mostSoldTours.push(temp);
        }
      }
    }

    this.getSoldToursNumber()
  }

  showBestRatedToursStats(): void{
    let unfilteredBestRatedToursStats = this.bestRatedToursStats
    this.bestRatedToursStats = unfilteredBestRatedToursStats.filter(item => this.authorsTours.some((authorsTour) => authorsTour.id === item.tourId));
    this.bestRatedToursStats.sort((a, b) => b.numberOfStats - a.numberOfStats);

    for(let i=0; i < 3; i++){
      if(this.bestRatedToursStats[i]){
        let temp = this.tours.find(tour => tour.id === this.bestRatedToursStats[i].tourId);
        if(temp){
          this.bestRatedTours.push(temp);
        }
      }
    }
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: [
          '0-25%',
          '25-50%',
          '50-75%',
          '75-100%'
        ],
        datasets: [{
          label: 'Number of tours in this range',
          data: [this.tourCompletionPercentageStats[0], this.tourCompletionPercentageStats[1], this.tourCompletionPercentageStats[2], this.tourCompletionPercentageStats[3]],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(130, 20, 255)',
          ],
          hoverOffset: 5
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: "Tour Completion % Statistics",
            color: "white",
            font: {
              size: 35
            },
          },
          legend: {  
            display: true,
            labels: {
              font: {
                size: 14,
              },
              color: "white"
            }
          }
        }
      }
    });
  }

}
