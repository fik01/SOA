import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { LayoutService } from '../layout.service';
import { Person } from 'src/app/shared/model/person.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyFollowersComponent } from '../my-followers/my-followers.component';
import { MyFollowingsComponent } from '../my-followings/my-followings.component';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { Tour } from '../../tour-execution/model/tour-model';
import { Router } from '@angular/router';
import { UserExpirience } from '../model/userExperience';
import {WalletService} from "../../marketplace/wallet.service";
import { Earning } from '../model/earning';
import { ToastrService } from 'ngx-toastr';
import { UserNews } from '../model/userNews';


@Component({
  selector: 'xp-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MyProfileComponent implements OnInit, OnDestroy {  
  user: User;
  userNews: UserNews;
  profile: Person;
  isDisabled: boolean = true;
  myFollowers: Person[] = [];
  myFollowings: Person[] = [];
  userXP: UserExpirience;
  tours: Tour[] = [];
  userId: number;
  purchased_tours: number;
  balance: number;
  walletSub: any;

  newsUpdateWhen: number = 0;

  notUsedTours: boolean = false;

  profileDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    biography: new FormControl(''),
    motto: new FormControl(''),
    profilePic: new FormControl('')
  })
  totalProfit?: Number
  earnings?: Earning[] = [];

  constructor(private authService: AuthService,
              private service: LayoutService,
              public dialog: MatDialog,
              private Executionservice: TourExecutionService,
              private router: Router,
              private walletService: WalletService){
    this.user = this.authService.user$.getValue();
  }

  ngOnInit(): void {
    this.getTours()
    this.GetUnusedTours()
    if(this.user.role === 'tourist')
      this.getXP()
    this.getWalletBalance();
    this.getEarning();
    this.getToursEarnings();
    this.getUserNews();
    this.service.getUserProfile(this.user.id, this.user.role).subscribe({
      next: (result => {
        this.profile = result;

        this.profileDetailsForm.patchValue({
          name: this.profile.name,
          surname: this.profile.surname,
          biography: this.profile.biography,
          motto: this.profile.motto,
          profilePic: this.profile.profilePic
        })
      }),
      error: (error: any) => console.log(error),
      complete: (): void => {
        this.service.getFollowers(this.user.id, this.user.role).subscribe({
          next: (result => this.myFollowers = result),
          error: (error: any) => console.log(error),
          complete: (): void => {
            this.service.getFollowings(this.user.id, this.user.role).subscribe({
              next: (result => this.myFollowings = result),
              error: (error: any) => console.log(error),
              complete: (): void => { }
            })
          }
        })
      }
    })
  }

  getUserNews(): void {
    this.service.getUserNewsByTouristId(this.user.id).subscribe({
      next: (result => {
        this.userNews = result;
        this.newsUpdateWhen = result.sendingPeriod;
        // console.log("neeeeeeeeeeeeeeeeeeeeeeeeeews");
        // console.log(this.newsUpdateWhen)
        // console.log(result)
      }),
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  setNewsUpdate(periodTime: number): void {
    this.newsUpdateWhen = periodTime;
  }

  getXP(): void {
    this.service.getXP(this.user.id).subscribe({
      next: (res => { this.userXP = res; console.log(this.userXP) }),
      error: (error: any) => console.log(error)
    })
  }
  getTours(): void {
    this.Executionservice.getUsedTours(this.user.id).subscribe({
      next: (res => { 
        this.tours = res; 
        if(this.tours.length == 0){
          this.notUsedTours = true;
        }
      }),
      error: (error: any) => console.log(error)
    })
  }

  GetUnusedTours(): void {
    this.Executionservice.getPurchasedTours(this.user.id).subscribe({
      next: (res => { this.purchased_tours = res.length; }),
      error: (error: any) => console.log(error)
    })
  }

  enableUpdate(): void {
    this.isDisabled = false;
  }

  update(): void {
    this.setDataValues();

      if (this.userNews.sendingPeriod != this.newsUpdateWhen)
      {
        this.userNews.sendingPeriod = this.newsUpdateWhen;
        const date = new Date();
        this.userNews.lastSendMs = date.getTime();
        // console.log("miliiiiiiiiiiiiiiiiiiiii")
        // console.log(this.userNews.lastSendMs)
        this.service.updateUserNews(this.userNews).subscribe({
          next: (result => {
            console.log("updateovan user news");
            console.log(result);
          })
        })
      }

      this.service.update(this.profile, this.user.id, this.user.role).subscribe({
        next: (result => {}),
        error: (error: any) => {
          console.log(error)
          this.isDisabled = false;
        },
        complete: (): void => {
          this.isDisabled = true;
        }
      });
        this.isDisabled = true;
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

  getWalletBalance() {
    this.walletSub = this.walletService.getWallet().subscribe((wallet) => {
      this.balance = wallet.balance;
    })
  }

  getEarning(): void{
    if(this.user.role === 'author')
      this.service.getEarning(this.user.id).subscribe({
        next:(earning) =>{
        this.totalProfit = earning;
      },
      complete:() => {
        this.totalProfit = 0.1*Number(this.totalProfit);
      }
      })
  }
  getToursEarnings(): void{
    if(this.user.role === 'author')
      this.service.getToursEarnings(this.user.id).subscribe({
        next: (earning) =>{
        this.earnings = earning.results;
      },
      complete:() => {
        this.earnings?.forEach((earning) => { earning.earning = Number(earning.earning)*0.1})
      }
    })
  }

  calculateRows(): number[] {
    const number = this.earnings!.length / 5;
    const numberOfRows = Math.ceil(number);
  
    return Array.from({ length: numberOfRows }, (_, index) => index);
  }
  

  displayBars(index: Number): Earning[]{
    const min = Number(index) * 5;
    const max = Number(index) * 5 + 5;

    return this.earnings!.filter((earning) => {
      const currentIndex = this.earnings!.indexOf(earning);
      return currentIndex !== -1 && min <= currentIndex && currentIndex < max;
    });
  }

  calculateBarFill(earning: Earning){
    const height = Math.ceil(Number(earning.earning)/Number(this.totalProfit) * 100)
    return {
      'height': (height >= 30) ? height.toString() + '%' : '30'  + '%'
    }
  }

  ngOnDestroy(): void {
    this.walletSub.unsubscribe();
  }
}