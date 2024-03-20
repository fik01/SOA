import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "../../map/map.component";
import { PublicTourKeyPoints, TourKeyPoints } from "src/app/feature-modules/tour-authoring/model/tour-keypoints.model";
import { PublicFacility } from "src/app/feature-modules/tour-authoring/model/facility.model";
import { Tour } from "src/app/feature-modules/tour-authoring/model/tour.model";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MatDialog } from "@angular/material/dialog";
import { TourAuthoringService } from "src/app/feature-modules/tour-authoring/tour-authoring.service";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PublicTourKeypointsComponent } from "src/app/feature-modules/tour-authoring/public-tour-keypoints/public-tour-keypoints.component";
import { PublicFacilitiesComponent } from "src/app/feature-modules/tour-authoring/public-facilities/public-facilities.component";
import { TourFormComponent } from "src/app/feature-modules/tour-authoring/tour-form/tour-form.component";
import { PagedResults } from "../../model/paged-results.model";
import { MapViewService } from "../map-view.service";
import { PositionSimulator, Session } from "src/app/feature-modules/tour-execution/model/position-simulator.model";
import { TransportationType } from "src/app/feature-modules/tour-authoring/model/tour-duration.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TourRatingFormComponent } from "../tour-rating-form/tour-rating-form.component";
import { ToastrService } from "ngx-toastr";
import { Person } from "../../model/person.model";
import { Challenge, ChallengeStatus, ChallengeType } from "src/app/feature-modules/administration/model/challenge.model";
import { ChallengeExecution } from "src/app/feature-modules/tour-execution/model/challenge-execution.model";
import { UserExpirience } from "src/app/feature-modules/layout/model/userExperience";
import { LayoutService } from "src/app/feature-modules/layout/layout.service";
import { ChallengeDetailsDialogComponent } from "../../map/challenge-details-dialog/challenge-details-dialog.component";
import { take, timer } from "rxjs";
import { ChallengeLocationDialogComponent } from "src/app/feature-modules/tour-execution/challenge-location-dialog/challenge-location-dialog.component";
import { ChallengeMiscDialogComponent } from "src/app/feature-modules/tour-execution/challenge-misc-dialog/challenge-misc-dialog.component";
import { ChallengeSocialDialogComponent } from "src/app/feature-modules/tour-execution/challenge-social-dialog/challenge-social-dialog.component";
import { TourCreationComponent } from "src/app/feature-modules/tour-authoring/tour-creation/tour-creation.component";

@Component({
  selector: 'xp-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  @ViewChild('mapViewMap') mapComponent: MapComponent;
  @ViewChild('mapViewMap2') routeMap: MapComponent;
  publicTourKeyPoint: PublicTourKeyPoints[]=[];
  publicFacilities: PublicFacility[]=[];
  tourKeyPoints: TourKeyPoints[] = [];
  tours: Tour[] = [];
  user: User = {
    id: 0,
    username: "",
    role: ""
  };
  positionSimulator: PositionSimulator = {
    latitude: 0,
    longitude: 0,
    touristId: 0
  };
  showAddLocation: boolean = false;
  showCenterLocation: boolean = false;
  isLocationInCenter: boolean = true;
  transportationType: any = TransportationType;
  selectedTour: Tour = {
    name: "",
    description: "",
    difficulty: 0,
    tags: [],
    status: 0,
    price: 0,
    equipment: [],
    distanceInKm: 0,
    durations: [],
    keyPoints: [],
    canBeRated: false,
  };
  selectedTourTransportation: string;
  showStartTour: boolean = false;
  activeSession: Session;
  showAbandonTour: boolean = false;
  showCompleteTour: boolean = false;
  completedTourId: number;
  sessions: Session[];
  isPopupVisible = false;
  person: Person;
  challenges: Challenge[];
  activeChallenge?: ChallengeExecution;
  userExperience: UserExpirience;
  showStartChallenge: boolean = false;
  showCompleteChallenge: boolean = false;
  showAbandonChallenge: boolean = false;
  selectedTab: number = 0;
  selectedChallengeType: string = "0";
  displayedChallenges: Challenge[];
  nearbyChallenge?: Challenge;
  showShowPicture: boolean = false;
  showChallengeInfo: boolean = false;
  showMiscButtons: Boolean = false;
  disabledChallengeTypes: boolean[] = [false, false, false];
  showLocationChallengeCompleted : boolean = false;

  constructor(
    private service: MapViewService,
    private dialog: MatDialog,
    private tourAuthoringService: TourAuthoringService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private layoutService: LayoutService,
    private route: ActivatedRoute ){}


  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      this.user = user;
      this.loadTours();
      this.setMyLocation();
      this.loadPerson();
      this.loadChallenges();
      this.loadUserExperience();
    })
  }

  loadUserExperience() {
    this.layoutService.getXP(this.authService.user$.getValue().id).subscribe({
      next: (res => { this.userExperience = res; console.log(this.userExperience)}),
      error: (error: any) => console.log(error)
    })
  }

  loadChallenges() {
    this.service.getChallenges().subscribe({
      next: (result: PagedResults<Challenge>) => {
        this.challenges = result.results.filter(c => c.keyPointId == null && c.status == ChallengeStatus.Active);
        this.service.getChallengeExecutionForTourist(this.user.id).subscribe({
          next:(result: PagedResults<ChallengeExecution>) =>{

            this.continueActiveChallenge(result.results);
            this.activeChallenge = result.results.find(challengeExecution => challengeExecution.isCompleted === false);

            // remove completed challenges
            this.challenges = this.challenges.filter(challenge => !result.results.some(challengeExecution => challengeExecution.challengeId === challenge.id && challengeExecution.isCompleted == true));

            if (this.selectedTab == 1) {
              this.showChallengeOnMap();
            }
          }
        });
      }
    })
  }

  continueActiveChallenge(challengeExecutions: ChallengeExecution[]) {
    this.activeChallenge = challengeExecutions.find(challengeExecution => challengeExecution.isCompleted === false);
    if (!this.activeChallenge) return;
    this.nearbyChallenge = this.challenges.find(challenge => challenge.id === this.activeChallenge?.challengeId);
    this.setUIForActiveChallenge();
    if (this.nearbyChallenge?.type === ChallengeType.Misc) {
      this.showStartChallenge = false;
      this.showMiscButtons = true;
      this.openChallengeDialog(this.nearbyChallenge!.name!,this.nearbyChallenge!.description!,2);
    } else if (this.nearbyChallenge?.type === ChallengeType.Location) {
      this.showAbandonChallenge = true;
      this.showShowPicture = true;
    } else if (this.nearbyChallenge?.type === ChallengeType.Social) {
      if (this.activeChallenge?.isCompleted) {
        this.toastr.warning(`You have completed social challenge: ${this.nearbyChallenge!.name}`,'Warning');
        this.service.addXPSocial(this.nearbyChallenge!.id!,this.nearbyChallenge!.experiencePoints!).subscribe();
        this.nearbyChallenge = undefined;
        this.activeChallenge = undefined;
        this.ngOnInit();
      }
      // to-do: mozda naci bolje resenje za ovo
      this.toastr.warning(`You have activated social challenge: ${this.nearbyChallenge!.name} to complete the challenge ${this.nearbyChallenge!.requiredAttendance} people need to activate this challenge`,'Warning');
      this.showStartChallenge = false;
    }
  }

  private setUIForActiveChallenge() {
    if (!this.activeChallenge) {
      this.showAbandonChallenge = false;
      this.showCompleteChallenge = false;
      this.showMiscButtons = false;
      this.showChallengeInfo = false;
      this.disabledChallengeTypes = [false, false, false];
      return;
    }

    if (this.nearbyChallenge?.type === ChallengeType.Misc) {
      this.showMiscButtons = true;
    } else {
      this.showAbandonChallenge = true;
    }

    this.showChallengeInfo = true;
    this.selectedTab = 1;
    this.selectedChallengeType = this.nearbyChallenge!.type!.toString();
    this.disabledChallengeTypes = [true, true, true];
    this.disabledChallengeTypes[this.nearbyChallenge?.type!] = false;
  }

  loadPerson() {
    this.service.getUserProfile(this.user.id, this.user.role).subscribe({
      next: (result: Person) => {
        this.person = result;
      },
      error: () => {},
    });
  }

  private enableTourRating() {
    this.tours.forEach(tour => {
      tour.canBeRated = this.sessions.some(session => session.tourId == tour.id && session.distanceCrossedPercent! > 30);
    })
  }

  private loadSessions() {
    this.service.getSessionsByTouristId(this.user.id).subscribe({
      next: (result: PagedResults<Session>) => {
        this.sessions = result.results;
      },
      error: () => {
        this.sessions = [];
      },
      complete: () => {
        this.enableTourRating();
      }
    })
  }


  openAddPublicKeyPoint(): void {
    const dialogRef = this.dialog.open(PublicTourKeypointsComponent, {

    });
  }
  openAddPublicFacilitiy(): void {
    const dialogRef = this.dialog.open(PublicFacilitiesComponent, {
      width: '50%',
      height: '90%'
    });
  }

  openAddNewTour(): void{
    const dialogRef = this.dialog.open(TourCreationComponent,{
    })
  }

  showPublicKeyPoint(): void {
    this.mapComponent.clearMarkers();
    this.mapComponent.removeFacilities();
    this.tourAuthoringService.getPublicTourKeyPoints().subscribe({
      next: (response: PublicTourKeyPoints[]) => {
        this.publicTourKeyPoint = response;
        this.publicTourKeyPoint.forEach((keypoint) => {
          this.mapComponent.addMarker(keypoint.latitude, keypoint.longitude);
        });
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
  }

  loadTours(): void {
    switch (this.user.role) {
      case 'author':
        this.tourAuthoringService.getToursByAuthorId(this.user?.id!).subscribe({
          next: (response: PagedResults<Tour>) => {
            this.tours = response.results;
          },
          error: () => {},
          }
        );
        break;
      case 'tourist':
        this.service.getBoughtToursByTouristId(this.user.id).subscribe({
          next: (result: PagedResults<Tour>) => {
            this.tours = result.results;
          },
          complete: () => {
            this.getActiveSession();
            this.loadSessions();
            this.route.queryParams
              .subscribe(params => {
                if (params["tourId"] != undefined){
                  this.showTourOnMap(this.tours.find(t => t.id == params["tourId"])!)
                  this.selectedTour.selectedTransport = this.selectedTour.durations[0].transportation;
                }
              }
            );
          }
        })
    }
  }

  showTourOnMap(tour: Tour) {
    this.isLocationInCenter = false;
    let vehicleType = this.setTransportation(tour);
    this.mapComponent.clearMarkers();
    switch (this.user.role) {
      case 'author':
        tour.keyPoints.forEach(keypoint => {
          this.mapComponent.addTouristKeyPointMarker(keypoint, false, false);
          this.mapComponent.setRoute(vehicleType);
        });
        break;
      case 'tourist':
        tour.keyPoints.forEach(keypoint => {
          this.mapComponent.addTouristKeyPointMarker(keypoint, this.activeSession === null ? false : true, true);
          this.mapComponent.setRoute(vehicleType);
        })
        this.canStartTour(this.positionSimulator);
        break;
    }
  }

  private setTransportation(tour: Tour) {
    if (this.selectedTour != tour) {
      this.selectedTour.selectedTransport = undefined;
      this.selectedTour = tour;
    }
    let vehicleType = '';
    switch (this.selectedTour.selectedTransport) {
      case 0:
        vehicleType = 'walking';
        break;
      case 1:
        vehicleType = 'cycling';
        break;
      case 2:
        vehicleType = 'driving';
        break;
      default:
        vehicleType = 'walking';
    }
    return vehicleType;
  }

  showPublicFacilities(): void{
    this.mapComponent.clearMarkers();
    this.tourAuthoringService.getPublicFecilities().subscribe(
      (response: PublicFacility[])=>{
        this.publicFacilities = response;
        this.publicFacilities.forEach((facility)=>{
          this.mapComponent.initFacility(facility);
        })
      },
      (error) => {
        console.error('Error: ', error);
      }
    )

  }

  onEditClick(tourId: number | undefined){
    this.router.navigate([`tour-creation-form/${tourId}/1`]);
  }

  showAllPublic(): void{
    this.mapComponent.clearMarkers();
    this.tourAuthoringService.getPublicTourKeyPoints().subscribe(
      (response: PublicTourKeyPoints[]) => {
        this.publicTourKeyPoint = response;
        this.publicTourKeyPoint.forEach((keypoint) => {
          this.mapComponent.addMarker(keypoint.latitude, keypoint.longitude);
        });
      },
      (error) => {
        console.error('Error: ', error);
      }
    );

    this.tourAuthoringService.getPublicFecilities().subscribe(
      (response: PublicFacility[])=>{
        this.publicFacilities = response;
        this.publicFacilities.forEach((facility)=>{
          this.mapComponent.initFacility(facility);
        })
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
  }

  setMyLocation(): void {
    this.service.getPositionSimulatorByTouristId(this.user.id).subscribe({
      next: (result: PositionSimulator) => {
        this.positionSimulator = result;
        this.mapComponent.addTouristMarker(this.positionSimulator.latitude, this.positionSimulator.longitude);
        this.mapComponent.setView(this.positionSimulator.latitude, this.positionSimulator.longitude, 16);
        this.showCenterLocation = true;
      },
      error: () => {
        this.showAddLocation = true;
        this.showCenterLocation = false;
      },
    });
  }

  addLocation(): void {
    let positionSimulator: PositionSimulator = {
      latitude: this.mapComponent.getCenter().lat,
      longitude: this.mapComponent.getCenter().lng,
      touristId: this.user.id
    }
    this.service.createPositionSimulator(positionSimulator).subscribe({
      next: (result: PositionSimulator) => {
        this.positionSimulator = result;
        this.mapComponent.addTouristMarker(this.positionSimulator.latitude, this.positionSimulator.longitude);
        this.mapComponent.setView(this.positionSimulator.latitude, this.positionSimulator.longitude, 16);
        this.showAddLocation = false;
        this.showCenterLocation = true;
        this.person.latitude = result.latitude;
        this.person.longitude = result.longitude;
      },
      error: () => {},
      complete: () => {
        this.service.update(this.person, this.user.id, this.user.role).subscribe({
          next: (result: Person) => {
            this.person = result;
          }
        });
      }
    });
  }

  showMyLocation(): void {
    this.mapComponent.setView(this.positionSimulator.latitude, this.positionSimulator.longitude, 16);
    this.isLocationInCenter = true;
  }

  updateMyLocation(): void {
    this.positionSimulator.latitude = this.mapComponent.getTouristMarker().getLatLng().lat;
    this.positionSimulator.longitude = this.mapComponent.getTouristMarker().getLatLng().lng;
    this.service.updatePositionSimulator(this.positionSimulator).subscribe({
      next: (result: PositionSimulator) => {
        this.person.latitude = this.positionSimulator.latitude;
        this.person.longitude = this.positionSimulator.longitude;
        if (this.selectedTab === 0) {
          this.canStartTour(this.positionSimulator);
          this.completeKeyPoint(this.positionSimulator);
          this.canCompleteTour();
        }
        else if (this.selectedTab === 1) {
          this.canChallengeStart();
          this.updateActiveChallenge();
        }

      },
      complete: () => {
        this.setTourDistanceCrossed();
        this.service.update(this.person, this.user.id, this.user.role).subscribe({
          next: (result: Person) => {
            this.person = result;
          },
          error: () => {}
        });
      }
    });
    this.isLocationInCenter = false;
  }

  updateActiveChallenge() {
    if (!this.activeChallenge) return;

    this.activeChallenge.latitude = this.positionSimulator.latitude;
    this.activeChallenge.longitude = this.positionSimulator.longitude;

    if (this.nearbyChallenge?.type! === ChallengeType.Social) {
      if (this.mapComponent.getDistance(this.nearbyChallenge!.latitude, this.nearbyChallenge!.longitude, this.positionSimulator.latitude, this.positionSimulator.longitude) > this.nearbyChallenge!.range!) {
        this.service.deleteChallengeExecution(this.activeChallenge.id!).subscribe({
          next: () => {
            this.toastr.warning(`You have left the ${this.nearbyChallenge?.name} social challenge`, 'Warning');
            this.activeChallenge = undefined;
            this.nearbyChallenge = undefined;
            this.setUIForActiveChallenge();
            this.loadChallenges();
            this.showStartChallenge = false;
          },
          error: () => {}
        });
      }
    } else {
      this.service.updateChallengeExecution(this.activeChallenge, this.activeChallenge.id!).subscribe({
        next: (result: ChallengeExecution) => {
          this.activeChallenge = result;
          if (this.nearbyChallenge?.type === ChallengeType.Location) {
            if(this.mapComponent.getDistance(this.nearbyChallenge!.latitudeImage!, this.nearbyChallenge!.longitudeImage!, this.activeChallenge!.latitude, this.activeChallenge!.longitude) <= 30) {
              // to-do: ovde treba namestiti da prozor izgleda bolje i da se ne otvara svaki put kada se lokacija pomeri za jako malo (ako ostane u range)
              if(this.showLocationChallengeCompleted == false){
                this.openChallengeDialog(this.nearbyChallenge.name!, 'You have found the location where the picture was taken. Enjoy the view for a few seconds to complete the location challenge!', -1);
              }
              this.showLocationChallengeCompleted = true;
              this.showAbandonChallenge = false;
              this.showStartChallenge = false;

              timer(5000).pipe(take(1)).subscribe(() => {
                this.toastr.success('Location challenge is completed', 'Success');
                // this.openLocationChallengeDialog(
                //   this.activeChallenge!.name!,
                //   this.activeChallenge!.description!,
                //   this.activeChallenge!.image!,
                //   "Location challenge is completed!!!"
                // );
                this.showLocationChallengeCompleted = false;
                this.activeChallenge!.completionTime = new Date();
                this.activeChallenge!.isCompleted = true;

                this.service.updateChallengeExecution(this.activeChallenge!, this.activeChallenge!.id!).subscribe({
                  next: (result: ChallengeExecution) => {
                    this.nearbyChallenge = undefined;
                    this.activeChallenge = undefined;
                    this.setUIForActiveChallenge();
                    this.loadChallenges();
                  },
                  error: (error: any) => console.log(error)
                });
              });
            }
          }
        }
      });
    }
  }

  canChallengeStart() {
    if (this.activeChallenge) return;
    this.nearbyChallenge = this.displayedChallenges.find(challenge => this.mapComponent.getDistance(this.positionSimulator.latitude ,this.positionSimulator.longitude, challenge.latitude, challenge.longitude) <= challenge.range!);
    if (this.nearbyChallenge) {
      this.showStartChallenge = true;
    }
    else {
      this.showStartChallenge = false;
    }
  }

  private canStartTour(ps: PositionSimulator) {
    let firstKeyPointLat;
    let firstKeyPointLng;
    if (this.selectedTour.keyPoints.length != 0) {
      firstKeyPointLat = this.selectedTour.keyPoints[0].latitude;
      firstKeyPointLng = this.selectedTour.keyPoints[0].longitude;
      if (this.selectedTour.id != undefined && this.mapComponent.getDistance(firstKeyPointLat!, firstKeyPointLng!, ps.latitude, ps.longitude) <= 100 && this.activeSession === null) {
        this.showStartTour = true;
      }
      else {
        this.showStartTour = false;
      }
    }
  }

  startTour(): void {
    const session: Session = {
      tourId: this.selectedTour.id!,
      touristId: this.user.id,
      locationId: this.positionSimulator.id!,
      sessionStatus: 0,
      transportation: this.selectedTour.selectedTransport!,
      lastActivity: new Date(),
      completedKeyPoints: []
    }
    this.service.createSession(session).subscribe({
      next: (result => {
        this.activeSession = result;
        this.showStartTour = false;
        this.completeKeyPoint(this.positionSimulator);
      })
    })
    this.toastr.success('Tour successfully started!','Success');
  }

  private getActiveSession() {
    this.service.getActiveSessionByTouristId(this.user.id).subscribe({
      next: (result: Session) => {
        this.activeSession = result;
        if (result != null){
          this.selectedTour = this.tours.find(t => t.id == result.tourId)!;
          this.selectedTour.selectedTransport = result.transportation;
          this.showTourOnMap(this.selectedTour);
          this.canCompleteTour();
          this.revealSecretsOnInit();
        }
      }
    })
  }

  abandonTour() {
    this.activeSession.sessionStatus = 2;
    this.service.updateSession(this.activeSession).subscribe({
      complete: () => {
        this.getActiveSession();
        this.selectedTour.selectedTransport = undefined;
        this.resetView();
      }
    })
    this.toastr.warning('Tour abandoned!', 'Info');
  }

  private resetView() {
    this.mapComponent.clearMarkers();
    this.mapComponent.closePopups();
    this.selectedTour = {
      id: undefined,
      name: "",
      description: "",
      difficulty: 0,
      tags: [],
      status: 0,
      price: 0,
      equipment: [],
      distanceInKm: 0,
      durations: [],
      keyPoints: [],
    };
  }

  private completeKeyPoint(ps: PositionSimulator) {
    if (this.activeSession != null){
      this.selectedTour.keyPoints.forEach(kp => {
        if (this.mapComponent.getDistance(kp.latitude, kp.longitude, ps.latitude, ps.longitude) <= 100
          && this.activeSession.completedKeyPoints.find(ckp => ckp.keyPointId == kp.id) == undefined
          && kp.positionInTour === this.activeSession.completedKeyPoints.length) {
          this.service.completeKeyPoint(this.activeSession.id!, kp.id!).subscribe({
            next: (result: Session) => {
              this.activeSession = result;
              this.canCompleteTour();
              this.mapComponent.revealSecret(kp);
            },
            complete: () => {
              setTimeout(() => {
                this.toastr.success('Click on keypoint marker to reveal a secret.','Keypoint completed!');
              }, 800)
            }
          })
        }
      })
    }
  }

  private canCompleteTour() {
    if (this.activeSession != null && this.activeSession.completedKeyPoints.length == this.selectedTour.keyPoints.length)
      this.showCompleteTour = true;
    else
      this.showCompleteTour = false;
  }

  completeTour() {
    this.activeSession.sessionStatus = 1;
    this.showCompleteTour = false;
    this.service.updateSession(this.activeSession).subscribe({
      complete: () => {
        this.completedTourId = this.selectedTour.id!;
        this.getActiveSession();
        this.selectedTour.selectedTransport = undefined;
        this.resetView();
      }
    })
    if (this.selectedTour.authorId == this.user.id)
      this.showNotificationForBlog();
    this.toastr.success('Tour successfully completed!','Success');
  }

  private setTourDistanceCrossed() {
    if (this.activeSession != null) {
      this.routeMap.clearMarkers();
      //this.routeMap.addMarker(this.selectedTour.keyPoints[0].latitude, this.selectedTour.keyPoints[0].longitude);
      for (let keyPoint of this.selectedTour.keyPoints) {
        const isCompleted = this.activeSession.completedKeyPoints.some(completedPoint => completedPoint.keyPointId === keyPoint.id);

        if (isCompleted) {
          this.routeMap.addMarker(keyPoint.latitude,keyPoint.longitude);
        }
      }
      this.routeMap.addMarker(this.positionSimulator.latitude, this.positionSimulator.longitude);

      let vehicleType = '';
      switch (this.selectedTour.selectedTransport) {
        case 0:
          vehicleType = 'walking';
          break;
        case 1:
          vehicleType = 'cycling';
          break;
        case 2:
          vehicleType = 'driving';
          break;
        default:
          vehicleType = 'walking';
      }

      this.routeMap.setRoute(vehicleType);
      setTimeout(() => {
        this.activeSession.distanceCrossedPercent = Math.round(this.routeMap.getRouteDistanceInMeters() / (this.selectedTour.distanceInKm * 1000) * 100);
        this.service.updateSession(this.activeSession).subscribe({
          next: (result: Session) => {
            this.activeSession = result;
          }
        })
        if (this.activeSession.distanceCrossedPercent > 30) {
          this.tours.map(t => {
            if (t.id == this.activeSession.tourId) {
              t.canBeRated = true;
            }
          })
        }
      }, 1000)
    }
  }

  showNotificationForBlog() {
    const dialogRef = this.snackBar.open('Would you like to write a blog about this tour?', 'Yes', {
      duration: 15000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: "blog-snack"

    });
    dialogRef.onAction().subscribe(() => {
      this.router.navigate(['/blog/create/' + this.completedTourId]);
    });

  }

  openTourDetails(tour: Tour) {
    this.router.navigate([`tour-all-details/${tour.id}`]);
  }

  openReviewForm(tour: Tour) {
    const dialogRef = this.dialog.open(TourRatingFormComponent,{
      width: 'auto',
      height: 'auto',
      data: tour
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.toastr.success('Review added','Success');
      } else if (result === 'error') {
        this.toastr.error('There was an error while trying to add a rating','Error');
      } else if (result === 'update success') {
        this.toastr.success('Review updated', 'Success');
      }
    })
  }

  private revealSecretsOnInit() {
    this.selectedTour.keyPoints.forEach(kp => {
      if (this.activeSession.completedKeyPoints.find(ckp => ckp.keyPointId == kp.id))
        this.mapComponent.revealSecret(kp);
    });
  }

  changeTab(event: number) {
    this.selectedTab = event;
    if (event == 1) {
      this.selectedTour.selectedTransport = undefined;
      this.resetView();
      this.showChallengeOnMap();
    }

    if (event == 0) {
      this.mapComponent.removeFacilities();
    }

    this.showStartTour = false;
    this.showStartChallenge = false;
  }

  showChallengeOnMap() {
    this.mapComponent.removeFacilities();
    this.displayedChallenges = this.challenges.filter(challenge => challenge.type == parseInt(this.selectedChallengeType));
    this.displayedChallenges.forEach(challenge => {
      this.mapComponent.initChallenge(challenge);
    })
  }

  showChallenge(challenge: Challenge) {
    this.mapComponent.setView(challenge.latitude, challenge.longitude, 16);
  }

  startChallenge() {
    const challengeExecution : ChallengeExecution = {
      touristId: this.user.id,
      challengeId : this.nearbyChallenge!.id,
      latitude: this.positionSimulator.latitude,
      longitude: this.positionSimulator.longitude,
      activationTime: new Date(),
      isCompleted: false
    }

    this.service.addChallengeExecution(challengeExecution).subscribe({
      next: (result: ChallengeExecution) => {
        this.toastr.info('Challenge is now active','Info');
        this.activeChallenge = result;
      },
      error: () => {
        this.toastr.error('There was an error while trying to activate a challenge','Error');
      },
      complete: () => {
        this.setUIForActiveChallenge();
        this.showStartChallenge = false;
        if (this.nearbyChallenge?.type === ChallengeType.Social) {
          if (this.activeChallenge?.isCompleted) {
            this.toastr.success(`You have completed social challenge: ${this.nearbyChallenge!.name}`,'Success');
            this.service.addXPSocial(this.nearbyChallenge!.id!,this.nearbyChallenge!.experiencePoints!).subscribe();
            this.nearbyChallenge = undefined;
            this.activeChallenge = undefined;
            this.loadChallenges();
            this.setUIForActiveChallenge();
            this.showStartChallenge = false;
          }
        }
      }
    })
  }

  openChallengeDialog(name: string, description: string, type: number): void {
    this.dialog.open(ChallengeDetailsDialogComponent, {
      width: '400px',
      height: '200px',
      data: { name, description, type }
    });
  }

  completeChallenge() {
    this.activeChallenge!.completionTime = new Date();
    this.activeChallenge!.isCompleted = true;
    this.service.updateChallengeExecution(this.activeChallenge!, this.activeChallenge?.id!).subscribe({
      next: (result: ChallengeExecution) => {
        this.service.addXP(this.userExperience.id, this.nearbyChallenge?.experiencePoints!).subscribe();
        this.toastr.success('Challenge completed','Success');
        this.activeChallenge = undefined;
        this.nearbyChallenge = undefined;
        this.setUIForActiveChallenge();
        this.loadChallenges()
      },
      error: () => {}
    })
  }

  abandonChallenge() {
    this.service.deleteChallengeExecution(this.activeChallenge?.id!).subscribe({
      next: () => {
        this.activeChallenge = undefined;
        this.setUIForActiveChallenge();
      },
      error: () => {}
    })
  }

  openChallengeInfo() {
    if (this.nearbyChallenge?.type === ChallengeType.Social) {
      this.openSocialChallengeDialog(this.nearbyChallenge!.name!,this.nearbyChallenge!.description!, this.nearbyChallenge.requiredAttendance!);
      this.toastr.info(`Wait for ${this.nearbyChallenge.requiredAttendance} people to arrive`, 'Info');
    }
    // to-do: implementirati info za ostale tipove challenga, mozda i prepraviti ovo za social
    if (this.nearbyChallenge?.type === ChallengeType.Location) {
      this.openLocationChallengeDialog(this.nearbyChallenge!.name!,this.nearbyChallenge!.description!,this.nearbyChallenge!.image!);
    }
    if (this.nearbyChallenge?.type === ChallengeType.Misc) {
      this.openMiscChallengeDialog(this.nearbyChallenge!.name!,this.nearbyChallenge!.description!);
    }
  }

  openLocationChallengeDialog(name: string, description: string, image:string): void {
    this.dialog.open(ChallengeLocationDialogComponent, {
      width: '1200px',
      height: '700px',
      data: { name, description, image }
    });
  }

  openMiscChallengeDialog(name: string, description: string): void {
    this.dialog.open(ChallengeMiscDialogComponent, {
      width: '600px',
      height: '300px',
      data: { name, description }
    });
  }

  openSocialChallengeDialog(name: string, description: string, number: number): void {
    this.dialog.open(ChallengeSocialDialogComponent, {
      width: '600px',
      height: '400px',
      data: { name, description, number }
    });
  }
}
