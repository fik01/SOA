import { Component, OnInit } from '@angular/core';
import { Challenge, ChallengeStatus, ChallengeType } from '../model/challenge.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  challenges: Challenge[] = [];
  selectedChallenge: Challenge;
  challengeStatus: any = ChallengeStatus;
  challengeType: any = ChallengeType;
  hiddenElements: NodeListOf<HTMLElement>;
  selectedKeyPoint: TourKeyPoints =  {
    id: undefined,
    name: "",
    description: "",
    image: "",
    longitude: 0,
    latitude: 0,
    tourId: 0,
    positionInTour: 0,
    publicPointId: 0
  };
  user:User
  challengesAreEmpty: boolean = false
  tooltipMessage: string = ""


  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-main');
      } else {
        entry.target.classList.remove('show-main');
      }
    });
  });

  constructor(private service: AdministrationService,private route: ActivatedRoute,private authService: AuthService, private toastr: ToastrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getChallenges();
    this.hiddenElements = document.querySelectorAll('.hidden');
    this.hiddenElements.forEach((el) => this.observer.observe(el));
  
    this.route.params.subscribe((params) => {
      this.selectedKeyPoint.id = params['keypointid'];
  
      if (this.selectedKeyPoint.id !== undefined) {
        this.service.getTourKeyPointById(this.selectedKeyPoint.id).subscribe({
          next: (result: TourKeyPoints) => {
            this.selectedKeyPoint = result;
            console.log(result);
          }
        });
      }
    });
  
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.initializeTooltip();
  }
  

  deleteChallenge(challenge: Challenge): void {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "challenge", title: challenge.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteChallenge(challenge.id!).subscribe({
          next: () => {
            this.getChallenges();
            this.toastr.success('Challange successfully deleted','Success');
          },
          error: () => {
            this.toastr.error('There was an error while deleting challenge','Error');
          },
        });
      }
    })
  }

  approveChallenge(challenge: Challenge): void
  {
    challenge.status=ChallengeStatus.Active
    this.service.updateChallenge(challenge).subscribe({
      next: () => {
        this.toastr.success('Challange successfully approved','Success');
      },
      error: () => {
        this.toastr.error('There was an error while approving challenge','Error');
      },
    });
  }

  denyChallenge(challenge: Challenge): void
  {
    challenge.status=ChallengeStatus.Archived
    this.service.updateChallenge(challenge).subscribe({
      next: () => {
        this.toastr.success('Challange successfully denied','Success');
      },
      error: () => {
        this.toastr.error('There was an error while denying the challenge','Error');
      },
    });
  }

  getChallenges(): void {
    this.service.getChallenges().subscribe({
      next: (result: PagedResults<Challenge>) => {
        this.challenges = result.results;
        if(this.challenges.length == 0){
          this.challengesAreEmpty = true;
        }
      },
      error: () => {},
    });
  }

  onEditClicked(challenge: Challenge): void {
    this.selectedChallenge = challenge;
  }

  onAddClicked(): void {
    this.selectedChallenge = {} as Challenge;
  }

  initializeTooltip(): void{
    this.tooltipMessage = "Fill inputs with valid data and pick challenge location on map. If you choose 'social' fill additional input, if you choose 'location' add mistery image link, and choose where it is on the map."
  }

}
