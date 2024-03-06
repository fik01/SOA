import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TourAuthoringService } from 'src/app/feature-modules/tour-authoring/tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TourRating } from 'src/app/feature-modules/marketplace/model/tourrating.model';
import { Tour } from 'src/app/feature-modules/tour-authoring/model/tour.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourRecommenationDialogComponent } from '../../dialogs/tour-recommenation-dialog/tour-recommenation-dialog.component';

@Component({
  selector: 'xp-tour-rating-form',
  templateUrl: './tour-rating-form.component.html',
  styleUrls: ['./tour-rating-form.component.css'],
})
export class TourRatingFormComponent implements OnInit {
  personId: number;
  user: User;
  existingRating?: TourRating;
  isPopupVisible = false;

  constructor(
    private dialogRef: MatDialogRef<TourRatingFormComponent>,
    private service: TourAuthoringService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private tour: Tour
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.loadReview();
    });
  }

  loadReview() {
    this.service.getRatingByTouristIdAndTourId(this.user.id, this.tour.id!).subscribe({
      next: (result: TourRating) => {
        this.existingRating = result;
      },
      error: () => {
        this.existingRating = undefined;
      },
      complete: () => {
        this.tourratingForm.patchValue({
          grade: this.existingRating?.mark.toString() ?? '0',
          comment: this.existingRating?.comment ?? '',
          image: this.existingRating?.images.join(',')
        })
      }
    })
  }

  tourratingForm = new FormGroup({
    grade: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  closeForm() {
    this.dialogRef.close();
  }

  addTourRating(): void {
    if (this.validate()) {
      const tourrating: TourRating = {
        id: this.existingRating?.id ?? undefined,
        personId: this.user.id,
        tourId: this.tour!.id,
        mark: parseInt(this.tourratingForm.value.grade || ''),
        comment: this.tourratingForm.value.comment || '',
        dateOfVisit: new Date(),
        dateOfCommenting: new Date(),
        images: [],
      };

      const imageUris = this.tourratingForm.value.image;
      const images = imageUris?.split(',');
      if (images) {
        images.forEach((imageUri) => {
          tourrating.images.push(imageUri);
        });
      }

      if (this.existingRating) {
        this.service.updateTourRating(tourrating).subscribe({
          next: () => {
            this.dialogRef.close('update success');
          },
          error: () => {
            this.dialogRef.close('error');
          }
        });
      } else {
        this.service.addTourRating(tourrating).subscribe({
          next: () => {
            this.dialogRef.close('success');
          },
          error: () => {
            this.dialogRef.close('error');
          },
        });
      }

      this.isPopupVisible = true;
      const dialogRef = this.dialog.open(TourRecommenationDialogComponent, {
        width: '50vw',
        height: '20vh',
        data: { tourId: this.tour.id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.isPopupVisible =false;
        document.body.classList.remove('blur-background');
      });
      
    }
  }

  private validate(): boolean {
    if (!this.tourratingForm.value.grade) {
      this.toastr.warning('Grade must not be empty', 'Warning');
      return false;
    }
    if (!this.tourratingForm.value.comment) {
      this.toastr.warning('Comment must not be empty', 'Warning');
      return false;
    }
    if (!this.tourratingForm.value.image) {
      this.toastr.warning('Image must not be empty', 'Warning');
      return false;
    }
    return true;
  }
}
