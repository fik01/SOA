import { Component, OnInit } from '@angular/core';
import { AuthService } from './infrastructure/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Session } from './feature-modules/tour-execution/model/position-simulator.model';
import { User } from './infrastructure/auth/model/user.model';
import { TourExecutionService } from './feature-modules/tour-execution/tour-execution.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Explorer';
  showFooter: boolean = true;
  user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
    private tourExecutionService: TourExecutionService
  ) {}

  ngOnInit(): void {
    this.checkIfUserExists();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/' && event.url !== '/login' && event.url !== '/register' && event.url !== '/login' && event.url !== '/equipment' && event.url !== '/userProfiles' && event.url !== '/tourrating' && event.url !== '/tour' && event.url !== '/tourProblems' && event.url !== '/tourProblem' && event.url !== '/facilities' && event.url !== '/keypoints' && event.url !== '/available-clubs' && event.url !== '/club' && event.url !== '/rate-us' ) {
          this.showFooter = true;
        } else {
          this.showFooter = false;
        }
      }
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });    
    
  }
  
  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}
