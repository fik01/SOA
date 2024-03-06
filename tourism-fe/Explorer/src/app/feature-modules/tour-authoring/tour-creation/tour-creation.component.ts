import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Tour, TourStatus } from '../model/tour.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { TourAuthoringService } from '../tour-authoring.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour-creation',
  templateUrl: './tour-creation.component.html',
  styleUrls: ['./tour-creation.component.css']
})
export class TourCreationComponent {

  constructor(
    private dialogRef: MatDialogRef<TourCreationComponent>,
    private authService: AuthService,
    private router: Router,
    private service: TourAuthoringService,
    private toastr: ToastrService){}
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
      archivedDate: undefined,
      publishedDate: undefined,
      durations: [],
      keyPoints: [],
    };
  user: User | undefined;
  submitted:boolean=false
  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  ngOnInit(): void{
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }


  onCancelClick(): void {
    this.dialogRef.close(); 
}

  onCreateClick(): void {
    this.submitted=true
    if(this.tourForm.valid){
      this.constructEmptyTour();
      this.service.createTour(this.tour).subscribe({
        next: (result: Tour) => {
          //this.toastr.success('Tour created','Success');
          this.router.navigate([`tour-creation-form/${result.id}/1`]);
          this.dialogRef.close();
        },
        error: () =>{
          this.toastr.error('There was an error while trying to create a tour','Error');
        }
      });
      
    }
    else{
      this.toastr.warning('Please fill all of the fields','Warning');
    }
  }

  private constructEmptyTour(): void {
    this.tour.name = this.tourForm.value.name || '';
    this.tour.authorId = this.user?.id;
  }
}
