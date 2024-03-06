import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Person } from 'src/app/shared/model/person.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import * as signalR from '@microsoft/signalr';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { environment } from 'src/env/environment';
import { FollowerNotification } from '../model/followerNotification.model';
import { Follower } from '../model/follower.model';
import { ProfileComponent } from '../profile/profile.component';
import { Tour } from '../../tour-execution/model/tour-model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl } from '@angular/forms';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'xp-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  profiles: Person[];
  selectedProfile: Person;
  user: User;
  userProfile: Person;
  value: string = "";
  touristsChecked: boolean = true;
  authorsChecked: boolean = true;
  allTours: Tour[] = [];
  isPopupVisible = false;
  windowScrolled: boolean;

  tours = new FormControl([]);

  constructor(private service: LayoutService,
    private authService: AuthService,
    private Executionservice: TourExecutionService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
    this.user = this.authService.user$.getValue();
  }

  ngOnInit(): void {
    this.getAllTours();
    this.getUserProfile();
    this.GetAllUserProfiles();
    this.CreateHubConnection();

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  private getAllTours() {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.allTours = result.results;
      },
      error: (error: any) => console.log(error),
      complete: (): any => { }
    });
  }

  private getUserProfile() {
    this.service.getUserProfile(this.user.id, this.user.role).subscribe({
      next: (result => this.userProfile = result),
      error: (error: any) => console.log(error),
      complete: (): void => { }
    });
  }

  private CreateHubConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketHost, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection.start().catch((err) => {
      console.error(err);
    });
  }

  GetAllUserProfiles(): void {
    this.service.getAllUserProfiles(this.user.role).subscribe({
      next: (result => this.profiles = result),
      error: (error: any) => console.log(error),
      complete: (): void => {
        var profile = this.profiles[0];
        this.profiles.forEach(p => {
          if (p.userId === this.user.id)
            profile = p;
        });

        const index = this.profiles.indexOf(profile);

        this.profiles.splice(index, 1);

        this.GetFollowings();
      }
    });
  }

  GetFollowings(): void {
    this.service.getFollowings(this.user.id, this.user.role).subscribe({
      next: (result => {
        result.forEach(p => {
          let index = this.profiles.findIndex(profile => profile.id == p.id);

          this.profiles[index].followed = (index !== -1) ? true : false;
        });
      }),
      error: (error: any) => console.log(error),
      complete: (): void => { }
    });
  }

  follow(event: Event, id: number): void {
    event.stopPropagation();

    let index = this.profiles.findIndex(profile => profile.id == id);

    this.profiles[index].followed = true;

    let follower: Follower = this.createFollower(index);

    this.service.createFollow(follower, this.user.role).subscribe({
      next: (result => {}),
      error: (error: any) =>{ this.toastr.error('Error while trying to follow a user','Error');},
      complete: (): void => {
        this.hubConnection
          .invoke('SendNewFollowerNotification', this.userProfile.name + " " + this.userProfile.surname, "has started following you", this.profiles[index].id)
          .catch(error => console.log(error));

        this.ngOnInit();
      }
    })
  }

  createFollower(index: number) {
    let notification: FollowerNotification = {
      content: this.userProfile.name + " " + this.userProfile.surname + " has started following you",
      timeOfArrival: new Date(),
      read: false
    };

    let follower: Follower = {
      id: 0,
      followerId: this.user.id,
      followedId: this.profiles[index].id,
      notification: notification
    };
    return follower;
  }

  unfollow(event: Event, id: number): void {
    event.stopPropagation();

    let index = this.profiles.findIndex(profile => profile.id == id);

    this.profiles[index].followed = false;

    this.service.deleteFollow(this.user.id, this.profiles[index].id, this.user.role).subscribe({
      next: (result => {}),
      error: (error: any) => { this.toastr.error('Error while trying to unfollow a user','Error');},
      complete: (): void => { }
    })
  }

  openProfile(id: number): void {
    this.isPopupVisible = true;

    document.body.classList.add('blur-background');

    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '80vw',
      height: '90vh',
      data: { user: this.profiles.find(p => p.id == id) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.isPopupVisible =false;
      document.body.classList.remove('blur-background');
    });
  }

  getSelectedTourNames(): string[] {
    return this.allTours
      .filter(tour => (this.tours.value as number[])?.includes(tour.id))
      .map(tour => `${tour.name} - ${tour.distanceInKm}km`);
  }


  filter(): void {
    if(!this.touristsChecked && !this.authorsChecked){
      this.profiles = [];
      return;
    }

    this.profiles = this.profiles.filter(p =>
      (p.name.toLowerCase() + " " + p.surname.toLowerCase()).includes(this.value.toLowerCase())
      && ((p.role == ((this.authorsChecked && this.touristsChecked) ? p.role
        : ((this.touristsChecked) ? "tourist"
          : ((this.authorsChecked) ? "author" : p.role)))))
    );

    let authorIds: number[] = [];

    this.tours.value?.forEach(tourId => {
      const foundTour = this.allTours.find(t => t.id === tourId)
      if(foundTour)
        authorIds.push(foundTour.authorId);
    })

    if(this.authorsChecked && this.tours.value?.length! > 0){
      
      this.profiles = (this.touristsChecked) ? this.profiles.filter(p => p.role == "tourist" || (authorIds.findIndex(id => id == p.id)) != -1)
                    : this.profiles.filter(p => (authorIds.findIndex(id => id == p.id)) != -1)
    }

    if(this.touristsChecked && this.tours.value?.length! > 0){
      this.profiles.forEach(profile => {
        this.Executionservice.getUsedTours(profile.userId).subscribe({
          next: (res => {
              if(res.length == 0){
                this.profiles = this.profiles.filter(p => p.id != profile.id || p.role == "author");
              }
              let beenOnTour = false;
              res.forEach(r => {
                if(this.tours.value?.findIndex(t => t == r.id) != -1){
                  beenOnTour = true;
                }
              })

              if(!beenOnTour){
                this.profiles = this.profiles.filter(p => p.id != profile.id || p.role == "author");
              }
              
          })
        })

      })
    }
  }

  refresh(): void {
    this.value = '';
    this.GetAllUserProfiles();
  }
}