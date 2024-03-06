import { Component, EventEmitter, Input, OnChanges, Output, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { Challenge, ChallengeStatus, ChallengeType } from '../model/challenge.model';
import { AdministrationService } from '../administration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapComponent } from 'src/app/shared/map/map.component';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css']
})
export class ChallengeFormComponent implements OnChanges, OnInit{

  @Output() challengeUpdated = new EventEmitter<null>();
  @Input() keyPoint: TourKeyPoints;
  @Input() challenge: Challenge;
  @Input() shouldEdit: boolean = false;
  @ViewChild('challengeFormMap') mapComponent: MapComponent;
  @ViewChild('locationChallengeFormMap') mapLocationComponent: MapComponent;
  mapComponentInitialized: boolean = false;
  mapLocationComponentInitialized: boolean = false;
  user: User;


  constructor(private service: AdministrationService, private authService: AuthService, private router: Router,private layoutService: LayoutService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    if(this.user.role !== 'author'){
      this.mapComponent.setStatus();
      this.mapComponent.registerOnClick();
      this.mapComponentInitialized = true;
    }
    this.mapLocationComponent.setStatus();
    this.mapLocationComponent.registerOnClick();
    this.mapLocationComponentInitialized = true;
  }

  ngOnChanges(): void {
    this.challengeForm.reset();
    if (this.mapComponentInitialized) {
      this.mapComponent.clearMarkers();
      if (this.challenge.latitude && this.challenge.longitude) {
        this.updateMapMarker(this.challenge.latitude, this.challenge.longitude);
      }
    }
    if(this.mapLocationComponentInitialized){
      this.mapLocationComponent.clearMarkers();
      if(this.challenge.latitudeImage && this.challenge.longitudeImage){
        this.updateMapLocationMarker(this.challenge.latitudeImage,this.challenge.longitudeImage);
      }
    }
  }

  renderInputs(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value;

    const hiddenPhotoLocElement: HTMLElement | null= document.querySelector('#hiddenPhotoLoc');
    const imageLinkElement: HTMLElement | null= document.querySelector('#imageLink');
    const minPeopleElement: HTMLElement | null= document.querySelector('#minPeople');

    switch(selectedOption){
      case 'Location':
        minPeopleElement?.classList.add('d-none');
        hiddenPhotoLocElement?.classList.remove('d-none');
        imageLinkElement?.classList.remove('d-none');

        this.challengeForm.value.minPeopleCount = undefined;

        break;
      case 'Social':
        minPeopleElement?.classList.remove('d-none');
        hiddenPhotoLocElement?.classList.add('d-none');
        imageLinkElement?.classList.add('d-none');

        this.challengeForm.value.image = undefined;

        break;
      case 'Misc':
        minPeopleElement?.classList.add('d-none');
        hiddenPhotoLocElement?.classList.add('d-none');
        imageLinkElement?.classList.add('d-none');

        this.challengeForm.value.image = undefined;
        this.challengeForm.value.minPeopleCount = undefined;

        break;
    }
  }

  challengeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    image : new FormControl(),
    expirience: new FormControl('', [Validators.required]),
    range: new FormControl('', [Validators.required]),
    minPeopleCount: new FormControl(),
  });
  submitted:boolean=false
  isLocationSet:boolean=false;
  isLocationImageSet:boolean=false;
  isImageSet:boolean=false;
  isMinCountSet:boolean=false;

  isImageOK():void{
    const cordindatesImage = this.mapLocationComponent.getLastMarker() || undefined;
    this.isImageSet=this.challengeForm.get('image')?.value !== null && this.challengeForm.get('image')?.value !== undefined && this.challengeForm.get('image')?.value !== ''
    this.isLocationImageSet=cordindatesImage.getLatLng().lat > 0 && cordindatesImage.getLatLng().lng!>0
  }
  isCountOK():void{
    this.isMinCountSet=this.challengeForm.get('minPeopleCount')?.value>0;
  }

  addChallenge(): void {
    this.submitted=true;
    if(this.mapComponent.getLastMarker())
      this.isLocationSet=this.mapComponent.getLastMarker().getLatLng().lat>0 && this.mapComponent.getLastMarker().getLatLng().lng >0;
    
      if(this.challengeForm.value.type === 'Location'){
      const cordindatesImage = this.mapLocationComponent.getLastMarker() || undefined;
      this.isImageSet=this.challengeForm.get('image')?.value !== null && this.challengeForm.get('image')?.value !== undefined && this.challengeForm.get('image')?.value !== ''
      this.isLocationImageSet=cordindatesImage.getLatLng().lat > 0 && cordindatesImage.getLatLng().lng!>0
      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;

      const challengeLocation: Challenge = {
        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        image: this.challengeForm.value.image,
        latitude: 0,
        longitude: 0,
        latitudeImage: cordindatesImage.getLatLng().lat,
        longitudeImage: cordindatesImage.getLatLng().lng,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,
        creatorId: this.user.id,
      };

      if(this.user.role === 'author'){
        challengeLocation.keyPointId = this.keyPoint.id;
        challengeLocation.longitude = this.keyPoint.longitude;
        challengeLocation.latitude = this.keyPoint.latitude;
      }
      else{
        const coordinates = this.mapComponent.getLastMarker() || undefined;
        challengeLocation.latitude = coordinates.getLatLng().lat;
        challengeLocation.longitude = coordinates.getLatLng().lng;
      }

      console.log(challengeLocation);
      
      if(this.user.role==='administrator' || this.user.role ==='author')
      {
        if(this.challengeForm.valid && this.isLocationImageSet && this.isImageSet)
        {
            this.service.addChallenge(this.user.role,challengeLocation).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
            },
            error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
      if(this.user.role==='tourist')
      {
        if(this.challengeForm.valid && this.isLocationImageSet && this.isImageSet)
        {  
          this.layoutService.addChallenge(challengeLocation).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
              
            },
            error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
    }
    else if(this.challengeForm.value.type === 'Misc'){

      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;

      const challengeMisc: Challenge = {
        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        latitude: 0,
        longitude: 0,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,
        creatorId: this.user.id,
      };

      if(this.user.role === 'author'){
        challengeMisc.keyPointId = this.keyPoint.id;
        challengeMisc.longitude = this.keyPoint.longitude;
        challengeMisc.latitude = this.keyPoint.latitude;
      }
      else{
        const coordinates = this.mapComponent.getLastMarker() || undefined;
        challengeMisc.latitude = coordinates.getLatLng().lat;
        challengeMisc.longitude = coordinates.getLatLng().lng;
      }

      if(this.user.role==='administrator' || this.user.role ==='author')
      {
        if(this.challengeForm.valid)
        {  
          this.service.addChallenge(this.user.role,challengeMisc).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
            },
            error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
      if(this.user.role==='tourist')
      {
        if(this.challengeForm.valid)
        {  
            this.layoutService.addChallenge(challengeMisc).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
              
            },error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
    }
    else if(this.challengeForm.value.type === 'Social'){

      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;
      this.isMinCountSet=this.challengeForm.get('minPeopleCount')?.value>0
      const challengeSocial: Challenge = {

        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        latitude: 0,
        longitude: 0,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,
        requiredAttendance: Number(this.challengeForm.value.minPeopleCount) || undefined,
        creatorId: this.user.id,

      };

      if(this.user.role === 'author'){
        challengeSocial.keyPointId = this.keyPoint.id;
        challengeSocial.longitude = this.keyPoint.longitude;
        challengeSocial.latitude = this.keyPoint.latitude;
      }
      else{
        const coordinates = this.mapComponent.getLastMarker() || undefined;
        challengeSocial.latitude = coordinates.getLatLng().lat;
        challengeSocial.longitude = coordinates.getLatLng().lng;
      }

      if(this.user.role==='administrator' || this.user.role ==='author')
      {
        if(this.challengeForm.valid && this.isMinCountSet)
        { 
           this.service.addChallenge(this.user.role,challengeSocial).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
            },
            error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
      if(this.user.role==='tourist')
      {
        if(this.challengeForm.valid && this.isMinCountSet)
        { 
           this.layoutService.addChallenge(challengeSocial).subscribe({
            next: () => {
              this.toastr.success('Challenge added','Success');
              this.challengeUpdated.emit();
              this.challengeForm.reset();
              
            },
            error: () => {
              this.toastr.error('There was an error while adding a challenge','Error');
            },
          })
        }
      }
    }
    
    if(this.user.role === 'author')
      this.router.navigate(['tour-creation-form/' + this.keyPoint.tourId + '/1']);
  }

  updateChallenge(): void {
    if(this.challengeForm.value.type === ChallengeType.Location.toString()){
      const coordinates = this.mapComponent.getLastMarker();
      const cordindatesImage = this.mapLocationComponent.getLastMarker();

      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;

      const challengeLocation: Challenge = {
        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        latitude: coordinates.getLatLng().lat,
        longitude: coordinates.getLatLng().lng,
        image: this.challengeForm.value.image,
        latitudeImage: cordindatesImage.getLatLng().lat,
        longitudeImage: cordindatesImage.getLatLng().lng,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,

      };

      challengeLocation.id = this.challenge.id;
      if(this.challengeForm.valid)
      {
          this.service.updateChallenge(challengeLocation).subscribe({
          next: () => {
            this.toastr.success('Challenge successfully updated','Success');
            this.challengeUpdated.emit();
          },
          error: () => {
            this.toastr.error('There was an error while updating a challenge','Error');
          },
        })
      }
    }
    else if(this.challengeForm.value.type === ChallengeType.Misc.toString()){
      const coordinates = this.mapComponent.getLastMarker();

      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;

      const challengeMisc: Challenge = {

        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        latitude: coordinates.getLatLng().lat,
        longitude: coordinates.getLatLng().lng,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,

      };
      challengeMisc.id = this.challenge.id;
      if(this.challengeForm.valid)
      { 
         this.service.updateChallenge(challengeMisc).subscribe({
          next: () => {
            this.toastr.success('Challenge successfully updated','Success');
            this.challengeUpdated.emit();
          },
          error: () => {
            this.toastr.error('There was an error while updating a challenge','Error');
          },
        })
      }
    }
    else if(this.challengeForm.value.type === ChallengeType.Social.toString()){
      const coordinates = this.mapComponent.getLastMarker();

      const status = this.challengeForm.value.status !== null && this.challengeForm.value.status !== undefined
            ? ChallengeStatus[this.challengeForm.value.status as keyof typeof ChallengeStatus] : undefined;

      const challengeSocial: Challenge = {

        name: this.challengeForm.value.name || "",
        description: this.challengeForm.value.description || "",
        status: status,
        type: ChallengeType[this.challengeForm.value.type as keyof typeof ChallengeType] || undefined,
        latitude: coordinates.getLatLng().lat,
        longitude: coordinates.getLatLng().lng,
        range: Number(this.challengeForm.value.range) || undefined,
        experiencePoints: Number(this.challengeForm.value.expirience) || undefined,
        requiredAttendance: Number(this.challengeForm.value.minPeopleCount) || undefined,

      };
      challengeSocial.id = this.challenge.id;
      if(this.challengeForm.valid)
      {
          this.service.updateChallenge(challengeSocial).subscribe({
          next: () => {
            this.toastr.success('Challenge successfully updated','Success');
            this.challengeUpdated.emit();
          },
          error: () => {
            this.toastr.error('There was an error while updating a challenge','Error');
          },
        })
      }
    }
  }

  updateMapMarker(latitude: number, longitude: number): void {
    this.mapComponent.clearMarkers();
    this.mapComponent.addMarker(latitude, longitude);
    this.isLocationSet=this.mapComponent.getLastMarker().getLatLng().lat>0 && this.mapComponent.getLastMarker().getLatLng().lng >0;
  }

  updateMapLocationMarker(latitude: number, longitude: number): void {
    this.mapLocationComponent.clearMarkers();
    this.mapLocationComponent.addMarker(latitude, longitude);
    this.isImageOK()
  }

}
