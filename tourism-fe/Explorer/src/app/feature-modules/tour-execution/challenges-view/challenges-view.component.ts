import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourExecutionService } from '../tour-execution.service';
import { Challenge, ChallengeStatus } from '../../administration/model/challenge.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ChallengeExecution } from '../model/challenge-execution.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChallengeLocationDialogComponent } from '../challenge-location-dialog/challenge-location-dialog.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserExpirience } from '../../layout/model/userExperience';
import { AdministrationService } from '../../administration/administration.service';
import { LayoutService } from '../../layout/layout.service';
import { ChallengeDetailsDialogComponent } from 'src/app/shared/map/challenge-details-dialog/challenge-details-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-challenges-view',
  templateUrl: './challenges-view.component.html',
  styleUrls: ['./challenges-view.component.css']
})
export class ChallengesViewComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  challenges: Challenge[];
  latitudeTourist : number;
  longitudeTourist : number;
  isSetLocation: boolean = true;
  isUpdateLocation: boolean = false;
  isActivateChallenge: boolean = false;
  isCompleteChallenge: boolean = false;
  isAbandonChallenge: boolean = false;
  isShowPicture: boolean = false;
  activeChallenge: Challenge | undefined;
  executionChallenge: ChallengeExecution | undefined;
  executionChallengesForTourist: ChallengeExecution[];
  userExperience:UserExpirience
  
  constructor(private service: TourExecutionService, 
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private layoutService: LayoutService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.layoutService.getXP(this.authService.user$.getValue().id).subscribe({
      next: (res => { this.userExperience = res; console.log(this.userExperience)}),
      error: (error: any) => console.log(error)
    })
    this.service.getChallenges().subscribe({
      next: (result: PagedResults<Challenge>) => {
        this.challenges = result.results.filter(c => c.keyPointId == null && c.status == ChallengeStatus.Active);
        console.log(this.challenges);
        this.service.getExecutionChallengesForTourist(this.authService.user$.getValue().id).subscribe({
          next:(result: PagedResults<ChallengeExecution>) =>{
            this.executionChallengesForTourist = result.results;
    
            this.executionChallenge = this.executionChallengesForTourist.find(executionChallenge => executionChallenge.isCompleted === false);
            
            
            this.challenges = this.challenges.filter(challenge => {
              const challengeIdExists = this.executionChallengesForTourist.some(executionChallenge => executionChallenge.challengeId === challenge.id && executionChallenge.isCompleted ==true);
                
              return !challengeIdExists;
            });
            
            this.challenges.forEach(item => {
              if (item.status === ChallengeStatus.Active) {
                this.mapComponent.initChallenge(item);
              }
            });
          }
        });
              
      }
    });
  }

  ngAfterViewInit(): void {
    this.service.getExecutionChallengesForTourist(this.authService.user$.getValue().id).subscribe({
      next:(result: PagedResults<ChallengeExecution>) =>{
        this.executionChallengesForTourist = result.results;

        this.executionChallenge = this.executionChallengesForTourist.find(executionChallenge => executionChallenge.isCompleted === false);
        if(this.executionChallenge){
          console.log('postoji vec aktivan challenge');
          this.mapComponent.addTouristMarker(this.executionChallenge.latitude,this.executionChallenge.longitude);
          this.isSetLocation = false;
          this.isUpdateLocation = true;
          this.activeChallenge = this.challenges.find(challenge => challenge.id === this.executionChallenge!.challengeId);
          console.log(this.activeChallenge);
          if(this.activeChallenge!.type == 2){
            this.isCompleteChallenge = true;
            this.isAbandonChallenge = true;
          }else if(this.activeChallenge!.type == 1){
            this.isShowPicture = true;
            this.isAbandonChallenge = true;
          }
          
        }else{
          this.mapComponent.setStatus();
          this.mapComponent.registerTouristIconOnClick();
        }
      }
    });
    
  }

  setLocation() : void{
    if(this.mapComponent.getLastMarker() != undefined){
      this.latitudeTourist = this.mapComponent.getLastMarker().getLatLng().lat;
      this.longitudeTourist = this.mapComponent.getLastMarker().getLatLng().lng;
      console.log(this.latitudeTourist, this.longitudeTourist);
      this.isSetLocation = false;
      this.isUpdateLocation = true;
    } 
  }

  updateLocation(): void{
    this.toastr.info('Location updated','Info');
    this.latitudeTourist = this.mapComponent.getLastMarker().getLatLng().lat;
    this.longitudeTourist = this.mapComponent.getLastMarker().getLatLng().lng;
    console.log(this.latitudeTourist, this.longitudeTourist);
    this.isActivateChallenge = false;

    if(!this.executionChallenge){
      for (const challenge of this.challenges) {
        if(this.mapComponent.getDistance(this.latitudeTourist,this.longitudeTourist,challenge.latitude,challenge.longitude) <= challenge.range!){
          console.log('blizu si tog challenga',challenge);
          this.isActivateChallenge = true;
        }
      } 
    }else{
      this.executionChallenge.latitude = this.latitudeTourist;
      this.executionChallenge.longitude = this.longitudeTourist;
      if (this.activeChallenge?.type == 0) {
        if (this.mapComponent.getDistance(this.activeChallenge.latitude, this.activeChallenge.longitude, this.executionChallenge.latitude, this.executionChallenge.longitude) > this.activeChallenge.range!) {
          this.service.deleteExecutionChallenge(this.executionChallenge.id!).subscribe({
            next: () => {
              alert(`You have left the ${this.activeChallenge!.name} social challenge`);
              this.activeChallenge = undefined;
              this.executionChallenge = undefined;
              this.ngOnInit();
            }

          });
        }
      } else {
        this.service.updateExecutionChallenge(this.executionChallenge,this.executionChallenge.id!).subscribe({
          next: (result : ChallengeExecution) => {
            console.log(result);
            if(this.activeChallenge!.type == 1){
              console.log(this.activeChallenge);
              console.log(this.executionChallenge);
              console.log(this.mapComponent.getDistance(this.activeChallenge!.latitudeImage!, this.activeChallenge!.longitudeImage!, this.executionChallenge!.latitude, this.executionChallenge!.longitude));
              if(this.mapComponent.getDistance(this.activeChallenge!.latitudeImage!, this.activeChallenge!.longitudeImage!, this.executionChallenge!.latitude, this.executionChallenge!.longitude) <= 10){
                
                console.log("Tu si gdje je slika!!! Sačekaj 30 sekundi da se izazov kompletira.");
                this.showNotificationWhenTouristFindPicture();
                this.isAbandonChallenge = false;
                this.isUpdateLocation = false;
  
                
                timer(30000).pipe(take(1)).subscribe(() => {
                  this.openLocationChallengeDialog(
                    this.activeChallenge!.name!,
                    this.activeChallenge!.description!,
                    this.activeChallenge!.image!,
                    "Location challenge is completed!!!"
                  );
                
                  this.executionChallenge!.completionTime = new Date();
                  this.executionChallenge!.isCompleted = true;
                
                  this.service.updateExecutionChallenge(this.executionChallenge!, this.executionChallenge!.id!).subscribe({
                    next: (result: ChallengeExecution) => {
                      console.log(result);
                      this.isShowPicture = false;
                      this.executionChallenge = undefined;
                      this.activeChallenge = undefined;
                      this.isCompleteChallenge = false;
                      this.isAbandonChallenge = false;
                      this.isUpdateLocation = true;
                      this.ngOnInit();
                    },
                    error: (error: any) => console.log(error)
                  });
                });
                  
                                
                         
  
              }
            } else if (this.activeChallenge!.type == 0) {
              if (result.isCompleted) {
                alert(`You have completed social challenge: ${this.activeChallenge!.name}`);
                this.service.addXPSocial(this.activeChallenge!.id!,this.activeChallenge!.experiencePoints!).subscribe(res=>{
                  console.log(res)
                })
                this.activeChallenge = undefined;
                this.executionChallenge = undefined;
                this.isActivateChallenge = false;
                this.ngOnInit();
              } else {
                alert(`You have activate social challenge: ${this.activeChallenge!.name} to complete the challenge ${this.activeChallenge!.requiredAttendance} people need to activate this challenge`);
              }
            }
          },
          error: (error: any) => console.log(error)
        });
      }
    }
  }

  showNotificationWhenTouristFindPicture() {
    this.snackBar.open('You have found the location where the picture was taken. Enjoy the view for 30 seconds to complete the location challenge!', 'Ok', {
      duration: 30000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top', 
      
    });
  }

  activateChallenge(): void{
    for (const challenge of this.challenges) {
      if(this.mapComponent.getDistance(this.latitudeTourist,this.longitudeTourist,challenge.latitude,challenge.longitude) <= challenge.range!){
        this.activeChallenge = challenge;
        continue;
      }
    } 
    console.log(this.activeChallenge);
    const exectuionChallenge : ChallengeExecution = {
      touristId: this.authService.user$.getValue().id,
      challengeId : this.activeChallenge!.id,
      latitude: this.latitudeTourist,
      longitude: this.longitudeTourist,
      activationTime: new Date(),
      isCompleted: false
    }
    
    this.service.addExecutionChallenge(exectuionChallenge).subscribe({
      next: (result : ChallengeExecution) => {
        this.toastr.info('Challenge is now active','Info');
        this.executionChallenge = result;
        console.log(this.executionChallenge);
      },
      error: (error: any) => {
          this.toastr.error('There was an error while trying to activate a challenge','Error');
      },
      complete: (): void => {
        if(this.activeChallenge!.type == 2){
          this.isCompleteChallenge = true;
          this.isAbandonChallenge = true;
          this.isActivateChallenge = false;
          this.openChallengeDialog(this.activeChallenge!.name!,this.activeChallenge!.description!,2);
        }else if(this.activeChallenge!.type == 1){
          this.isActivateChallenge = false;
          this.openLocationChallengeDialog(this.activeChallenge!.name!,this.activeChallenge!.description!,this.activeChallenge!.image!,"");
          this.isShowPicture = true;
          this.isAbandonChallenge = true;
        } else if (this.activeChallenge!.type == 0) {
          if (this.executionChallenge?.isCompleted) {
            //alert(`You have completed social challenge: ${this.activeChallenge!.name}`);
            this.toastr.warning(`You have completed social challenge: ${this.activeChallenge!.name}`,'Warning');
            this.service.addXPSocial(this.activeChallenge!.id!,this.activeChallenge!.experiencePoints!).subscribe(res=>{
              console.log(res)
            })
            this.activeChallenge = undefined;
            this.executionChallenge = undefined;
            this.ngOnInit();
          }
          //alert(`You have activate social challenge: ${this.activeChallenge!.name} to complete the challenge ${this.activeChallenge!.requiredAttendance} people need to activate this challenge`);
          this.toastr.warning(`You have activate social challenge: ${this.activeChallenge!.name} to complete the challenge ${this.activeChallenge!.requiredAttendance} people need to activate this challenge`,'Warning');
          this.isActivateChallenge = false;
        }
        
      }
    });
  }

  completeChallenge(): void{
    console.log(this.activeChallenge);
    console.log(this.executionChallenge);
    if(this.executionChallenge && this.activeChallenge){
      if(this.mapComponent.getDistance(this.executionChallenge.latitude,this.executionChallenge.longitude,this.activeChallenge.latitude,this.activeChallenge.longitude) <= this.activeChallenge.range!){
        this.executionChallenge.completionTime = new Date();
        this.executionChallenge.isCompleted = true;

        this.service.updateExecutionChallenge(this.executionChallenge,this.executionChallenge.id!).subscribe({
          next: (result : ChallengeExecution) => {
            this.service.addXP(this.userExperience.id,this.activeChallenge!.experiencePoints!).subscribe(res=>{
              console.log(res)
            })
            this.toastr.info('Challenge completed','Info');
            console.log(result);
            this.executionChallenge = undefined;
            this.activeChallenge = undefined;
            this.isCompleteChallenge = false;
            this.isAbandonChallenge = false;
            this.ngOnInit();
          },
          error: (error: any) => {this.toastr.error('Error while trying to complete the challenge','Error');}
        });
      }else{
        this.toastr.warning('You cant complete the challange because youre not near the wanted location','Success');
      }
      
    }
  }

  abandonChallenge(): void{
    console.log(this.executionChallenge);

    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "abandon", type: "challenge", title: this.activeChallenge!.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.executionChallenge){
          this.executionChallenge.isCompleted = true;
    
          this.service.updateExecutionChallenge(this.executionChallenge,this.executionChallenge.id!).subscribe({
            next: (result : ChallengeExecution) => {
              this.toastr.info('Challenge abandoned','Info');
              this.executionChallenge = undefined;
              this.activeChallenge = undefined;
              this.isCompleteChallenge = false;
              this.isAbandonChallenge = false;
              this.isShowPicture = false;
              this.ngOnInit();
            },
            error: (error: any) => {this.toastr.error('Error while trying to abandon the challenge','Error');}
          });
        }
      }
    })
  }

  openLocationChallengeDialog(name: string, description: string, image:string, status: string): void {
    this.dialog.open(ChallengeLocationDialogComponent, {
      width: '1200px',
      height: '800px',
      data: { name, description, image, status }
    });
  }

  openChallengeDialog(name: string, description: string, type: number): void {
    this.dialog.open(ChallengeDetailsDialogComponent, {
      width: '400px',
      height: '200px',
      data: { name, description, type }
    });
  }

  showPictureAgain() : void{
    this.openLocationChallengeDialog(this.activeChallenge!.name!,this.activeChallenge!.description!,this.activeChallenge!.image!, "");
  }
}
