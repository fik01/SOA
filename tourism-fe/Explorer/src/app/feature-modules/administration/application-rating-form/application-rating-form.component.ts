import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationRating } from '../model/application-rating.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AdministrationService } from '../administration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-application-rating-form',
  templateUrl: './application-rating-form.component.html',
  styleUrls: ['./application-rating-form.component.css'],
})
export class ApplicationRatingFormComponent implements OnInit {
  @Output() applicationRatingUpdated = new EventEmitter<null>();

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
  }

  applicationRatingForm = new FormGroup({
    grade: new FormControl(undefined, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    comment: new FormControl('', []),
  });

  addApplicationRating(): void {
    const applicationRating: ApplicationRating = {
      grade: this.applicationRatingForm.value.grade || -1,
      comment: this.applicationRatingForm.value.comment || '',
      userId: this.user.id || -1,
      issueDate: new Date() || null,
    };
    console.log(applicationRating);
    this.service
      .addApplicationRating(applicationRating, this.user.role)
      .subscribe({
        next: () => {
          this.toastr.success('Rating added','Success');
          this.applicationRatingUpdated.emit();
        },
        error: () => {
          this.toastr.error('Error while leaving a rating, please leave a valid grade','Error');
        },
      });
  }
}
