import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  hiddenElements: NodeListOf<HTMLElement>;
  featuredTours: Tour[];
  user: User;

  @ViewChild('explorePage', { static: true }) explorePage: ElementRef;

  constructor(private ngZone: NgZone, private tourAuthoringService: TourAuthoringService, private router: Router, private authService: AuthService) {}
  scrollToExplorePage() {
    this.ngZone.run(() => {
      this.explorePage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

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
    this.user = this.authService.user$.getValue();
    console.log(this.user)
    this.hiddenElements = document.querySelectorAll('.hidden');
    this.hiddenElements.forEach((el) => this.observer.observe(el));
    this.tourAuthoringService.getFeaturedTours().subscribe({
      next: (result) => {
        this.featuredTours = result.results;
      },
      complete: () => {
        this.featuredTours.sort((a, b) => b.price - a.price);
        this.featuredTours = this.featuredTours.slice(0, 3);
      }
    })
  }

  navigateToLogin(tourId: Number | undefined) {
    if(this.user.role === 'tourist'){
      this.router.navigate(['/tour-details/'+tourId]);
      return;
    }
    this.router.navigate(['/login']);
  }
}
