import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AdministrationService } from '../administration.service';
import { ApplicationRating } from '../model/application-rating.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-application-ratings',
  templateUrl: './application-ratings.component.html',
  styleUrls: ['./application-ratings.component.css'],
})
export class ApplicationRatingsComponent implements OnInit {
  ApplicationRatings: ApplicationRating[] = [];
  user: User;
  constructor(
    private service: AdministrationService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.getApplicationRatings();
  }

  getApplicationRatings(): void {
    this.service.getApplicationRatings(this.user.role).subscribe({
      next: (result: PagedResults<ApplicationRating>) => {
        this.ApplicationRatings = result.results.sort((objA, objB) => {
          const dateA = new Date(objA.issueDate);
          const dateB = new Date(objB.issueDate);
          return dateB.getTime() - dateA.getTime();
        });
      },
      error: () => {},
    });
  }

  deleteRating(applicationRating: ApplicationRating): void {
    this.service
      .deleteApplicationRating(applicationRating, this.user.role)
      .subscribe({
        next: (_) => {
          this.toastr.success('Rating deleted','Success');
          this.getApplicationRatings();
        },
        error: () => {
          this.toastr.error('Something went wrong when deleting','Error');
        },
      });
  }

  isCustomer() {
    return (
      this.user.role !== 'administrator' &&
      (this.user.role === 'tourist' || this.user.role === 'author')
    );
  }

  getStarsArray(grade: number): number[] {
    return new Array(grade);
  }
}
