import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TourRating } from '../model/tourrating.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { RateAlertDialogComponent } from 'src/app/shared/dialogs/rate-alert-dialog/rate-alert-dialog.component';

@Component({
  selector: 'xp-tourrating-form',
  templateUrl: './tourrating-form.component.html',
  styleUrls: ['./tourrating-form.component.css']
})
export class TourratingFormComponent implements OnChanges {

  @Output() tourratingUpdated = new EventEmitter<null>();
  @Input() tourrating: TourRating;
  personId :number


  ngOnChanges(): void {
    this.tourratingForm.reset();
  }

  tourratingForm=new FormGroup({
    grade: new FormControl('',[Validators.required]),
    comment: new FormControl('',[Validators.required]),
    dateofvisit: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
  })

  constructor(private service: MarketplaceService, private authService: AuthService, private toastr: ToastrService, private dialog: MatDialog) {
  }

  addTourRating(): void {

    const dateonForm = this.tourratingForm.value.dateofvisit || "";
    const date = new Date(dateonForm);

    this.personId = this.authService.user$.getValue().id;

    const tourrating: TourRating = {
      personId : this.personId,
      tourId : 1,
      mark: parseInt(this.tourratingForm.value.grade || ""),
      comment: this.tourratingForm.value.comment || "",
      dateOfVisit : date,
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

    const dialogRef = this.dialog.open(RateAlertDialogComponent, {
      data: {operation: "Rate", type: "tour", mark: tourrating.mark, comment: tourrating.comment, dateOfVisit: tourrating.dateOfVisit},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(tourrating);
        this.service.addTourRating(tourrating).subscribe({
          next: () => { 
            this.tourratingUpdated.emit();
            this.toastr.success('Rating added','Success'); 
          },
          error: () =>{
            this.toastr.error('There was an error while trying to add a rating','Error');
          }
        });
      }
    })
  }
}
