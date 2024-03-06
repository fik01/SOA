import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/shared/model/person.model';
import { User } from '../../administration/model/user.model';
import { Tour } from '../../tour-execution/model/tour-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { LayoutService } from '../layout.service';
import { MyFollowersComponent } from '../my-followers/my-followers.component';
import { MyFollowingsComponent } from '../my-followings/my-followings.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  profile: Person;
  isDisabled: boolean = true;
  myFollowers: Person[] = [];
  myFollowings: Person[] = [];
  tours: Tour[] = [];
  userId: number;
  purchased_tours: number;

  profileDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    biography: new FormControl(''),
    motto: new FormControl(''),
    profilePic: new FormControl('')
  })
  
  constructor(public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Person },
    private authService: AuthService,
    private service: LayoutService,
    public dialog: MatDialog,
    private Executionservice: TourExecutionService,
    private router: Router,
    private toastr: ToastrService) {
    this.profile = data.user
  }

  ngOnInit(): void {
    console.log(this.profile);

    this.getTours();

    this.profileDetailsForm.patchValue({
      name: this.profile.name,
      surname: this.profile.surname,
      biography: this.profile.biography,
      motto: this.profile.motto,
      profilePic: this.profile.profilePic
    })

    this.service.getFollowers(this.profile.userId, this.profile.role!).subscribe({
      next: (result => this.myFollowers = result),
      error: (error: any) => console.log(error),
      complete: (): void => {
        this.service.getFollowings(this.profile.userId, this.profile.role!).subscribe({
          next: (result => this.myFollowings = result),
          error: (error: any) => console.log(error),
          complete: (): void => { }
        })
      }
    })
  }

  getTours(): void {
    this.Executionservice.getUsedTours(this.profile.userId).subscribe({
      next: (res => { this.tours = res; }),
      error: (error: any) => console.log(error),
      complete: (): void => { this.GetUnusedTours() }
    })
  }

  GetUnusedTours(): void {
    this.Executionservice.getPurchasedTours(this.profile.userId).subscribe({
      next: (res => { this.purchased_tours = res.length; }),
      error: (error: any) => console.log(error)
    })
  }

  enableUpdate(): void {
    this.isDisabled = !this.isDisabled;

    this.profileDetailsForm.enable();

    if (this.isDisabled) {
      this.setDataValues();

      this.service.update(this.profile, this.profile.userId, this.profile.role!).subscribe({
        next: (result => { this.toastr.success('Profile updated','Success');}),
        error: (error: any) => {
          console.log(error)
          this.toastr.error('Error while trying to update profile','Error');
          this.isDisabled = false;
        },
        complete: (): void => {
          this.isDisabled = true;
        }
      });
    }

  }

  setDataValues(): void {
    this.profile.name = this.profileDetailsForm.value.name || '';
    this.profile.surname = this.profileDetailsForm.value.surname || '';
    this.profile.biography = this.profileDetailsForm.value.biography || '';
    this.profile.motto = this.profileDetailsForm.value.motto || '';
    this.profile.profilePic = this.profileDetailsForm.value.profilePic;
  }

  showFollowers(): void {
    const dialogRef = this.dialog.open(MyFollowersComponent, {
      width: '35vw',
      height: '35vw',
      data: { followers: this.myFollowers }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showFollowings(): void {
    const dialogRef = this.dialog.open(MyFollowingsComponent, {
      width: '35vw',
      height: '35vw',
      data: { followers: this.myFollowings }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showTourAllDetails(tourId: number): void {
    this.router.navigate(['/tour-all-details/' + tourId]);
  }
}
