import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tour, TourDifficulty, TourStatus } from '../model/tour.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { OnInit } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourDuration, TransportationType } from '../model/tour-duration.model';
import { MatDialog } from '@angular/material/dialog';
import { PublicKeypointsListComponent } from '../public-keypoints-list/public-keypoints-list.component';
import { TourKeypointsComponent } from '../tour-keypoints/tour-keypoints.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css'],
})
export class TourFormComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  mode: TourCreationMode;
  user: User | undefined;
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
    image: 'https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg='
  };

  showFieldWalk: boolean = false;
  showFieldBicycle: boolean = false;
  showFieldCar: boolean = false;
  isCarChecked: boolean = false;
  isWalkChecked: boolean = false;
  isBicycleChecked: boolean = false;

  toggleFieldWalk() {
    this.showFieldWalk = !this.showFieldWalk;
    this.isWalkChecked = !this.isWalkChecked;
    this.tourForm.patchValue({
      "walkTime": ''
    });
  }

  toggleFieldBicycle() {
    this.showFieldBicycle = !this.showFieldBicycle;
    this.isBicycleChecked = !this.isBicycleChecked;
    this.tourForm.patchValue({
      "bicycleTime": ''
    });
  }

  toggleFieldCar() {
    this.showFieldCar = !this.showFieldCar;
    this.isCarChecked = !this.isCarChecked;
    this.tourForm.patchValue({
      "carTime": ''
    });
  }
  tourForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    difficulty: new FormControl(),
    tags: new FormControl(''),
    walkTime: new FormControl('',),
    bicycleTime: new FormControl('',),
    carTime: new FormControl('',), 
    price: new FormControl('', Validators.required),
    image: new FormControl('',)
  });

  constructor(
    private service: TourAuthoringService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.route.params.subscribe((params) => {
      this.mode = parseInt(params['mode']);
      this.GetTourFromPath(params);
    });
  }

  private GetTourFromPath(params: Params) {
    if (this.mode === TourCreationMode.Edit) {
      this.service.getTour(parseInt(params['id'])).subscribe({
        next: (result: Tour) => {
          this.tour = result;
          this.loadCheckpointsToMap();
        }
      });
    }
  }

  private loadCheckpointsToMap(): void {
    this.mapComponent.setStatus();

    this.mapComponent.clearMarkers();

    if (this.mode === TourCreationMode.Edit) {
      this.patchFormData();
      this.mapComponent.initKeyPointsRoute(this.tour.keyPoints);
    }
    this.mapComponent.setRoute();
  }

  onAddKeyPoint() {
    switch (this.mode) {
      case TourCreationMode.Create:
        this.constructTour()
        this.service.createTour(this.tour).subscribe({
          next: (result: Tour) => {
            this.router.navigate([`keypoints/create/${result.id}/0`]);
          },
        });
        break;
      case TourCreationMode.Edit:
        this.constructTour();
        this.service.updateTour(this.tour).subscribe({
          next: (result: Tour) => {
            //this.router.navigate([`keypoints/create/${this.tour.id}/0`]);
            this.tour = result;
            this.mode = TourCreationMode.Edit;
            const dialogRef = this.dialog.open(TourKeypointsComponent,{
              data: {
                tourId: this.tour.id, 
              },
            });
            
            dialogRef.afterClosed().subscribe((result) => {
              this.service.getTourById(this.tour.id!).subscribe({
                next: (result) =>{
                  this.tour = result;
                  this.loadCheckpointsToMap();
                },
                error: () =>{
                  this.toastr.error('There was an error while trying to update tour','Error');
                }
              })
              
            });
          }
        });
        break;
    }
  }
  submitted:boolean=false
  onAddPublicKeyPoint(){
    this.constructTour()


    switch (this.mode) {
      case TourCreationMode.Create:
        this.constructTour();
        this.service.createTour(this.tour).subscribe({
          next: (result: Tour) => {
            this.tour = result;
            this.mode = TourCreationMode.Edit;
            const dialogRef = this.dialog.open(PublicKeypointsListComponent,{
              data: {
                tourId: this.tour.id, 
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              this.service.getTourById(this.tour.id!).subscribe({
                next: (result) =>{
                  this.tour = result;
                  this.loadCheckpointsToMap();
                },
                error: () =>{
                  this.toastr.error('There was an error while trying to create public keypoint','Error');
                }
              })
              
            });
          },
        });

        
        break;
      case TourCreationMode.Edit:
        this.constructTour();
        this.service.updateTour(this.tour).subscribe({
          next: (result: Tour) => {
            this.tour = result;
            this.mode = TourCreationMode.Edit;
            const dialogRef = this.dialog.open(PublicKeypointsListComponent,{
              data: {
                tourId: this.tour.id, 
              },
            })

            dialogRef.afterClosed().subscribe((result) => {
              this.service.getTourById(this.tour.id!).subscribe({
                next: (result) =>{
                  this.tour = result;
                  this.loadCheckpointsToMap();
                },
                error: () =>{
                  this.toastr.error('There was an error while trying to edit public keypoint','Error');
                }
              })
              
            });
          }
        });
        break;
    }
  }

  createTour(): void {
    this.submitted=true
    this.constructTour()
    this.finalizeCreation();
  }

  private patchFormData() {
    this.tourForm.patchValue({
      "name": this.tour.name,
      "description": this.tour.description,
      "difficulty": `${this.tour.difficulty}`,
      "tags": this.tour.tags.map(tag => '#' + tag).join(' '),
      "price": String(this.tour.price),
      "image": this.tour.image
    });
  
    this.tour.durations.forEach(duration => {
      if (duration.transportation === TransportationType.Walking) {
        this.toggleFieldWalk(); // Toggle the field to make isWalkChecked true
        this.tourForm.patchValue({
          "walkTime": (duration.timeInSeconds / 60).toString()
        });
      } else if (duration.transportation === TransportationType.Bicycle) {
        this.toggleFieldBicycle(); // Toggle the field to make isBicycleChecked true
        this.tourForm.patchValue({
          "bicycleTime": (duration.timeInSeconds / 60).toString()
        });
      } else if (duration.transportation === TransportationType.Car) {
        this.toggleFieldCar(); // Toggle the field to make isCarChecked true
        this.tourForm.patchValue({
          "carTime": (duration.timeInSeconds / 60).toString()
        });
      }
    });
  }

  private constructTour(): void {
    this.tour.name = this.tourForm.value.name || '';
    this.tour.description = this.tourForm.value.description || '';
    this.tour.difficulty = this.tourForm.value.difficulty ?? 0;
    this.tour.tags = this.getTags() || '';
    this.tour.status = TourStatus.Draft;
    this.tour.price = Number(this.tourForm.value.price) || 0;
    this.tour.authorId = this.user?.id;
    this.tour.equipment = [];
    this.tour.distanceInKm = this.mapComponent.getRouteDistanceInMeters() / 1000;
    this.tour.archivedDate = undefined;
    this.tour.publishedDate = undefined;
    this.tour.durations = this.getDurations();
    this.tour.image = this.tourForm.value.image || "https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=";
  }

  private getDurations(): TourDuration[] {
    const tourdurations: TourDuration[] = [];
  
    if (this.tourForm.value.walkTime !== '') {
      const walkDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.walkTime) * 60),
        transportation: TransportationType.Walking
      };
  
      tourdurations.push(walkDuration);
    }

    if (this.tourForm.value.bicycleTime !== '') {
      const bicycleDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.bicycleTime) * 60),
        transportation: TransportationType.Bicycle
      };
  
      tourdurations.push(bicycleDuration);
    }

    if (this.tourForm.value.carTime !== '') {
      const carDuration: TourDuration = {
        timeInSeconds: Math.round(Number(this.tourForm.value.carTime) * 60),
        transportation: TransportationType.Car
      };
  
      tourdurations.push(carDuration);
    }
  
    return tourdurations;
  }
  

  private getTags(): string[] {
    const regex = /#(\w+)/g;
    const hashtags: Set<string> = new Set<string>();
    let match;
    if (!this.tourForm.value.tags) return [];
    while ((match = regex.exec(this.tourForm.value.tags)) !== null) {
      const hashtag = match[1];

      hashtags.add(hashtag);
    }
    return Array.from(hashtags.values());
  }

  private finalizeCreation() {
    if(this.tourForm.valid)
    {
      switch (this.mode) {
        case TourCreationMode.Create:
          this.service.createTour(this.tour).subscribe({
            next: (result: Tour) => {
              this.toastr.success('Tour created','Success');
              this.router.navigate(['tour']);
            },
            error: () =>{
              this.toastr.error('There was an error while trying to create a tour','Error');
            }
          });
          break;
        case TourCreationMode.Edit:
          this.service.updateTour(this.tour).subscribe({
            next: () => {
              this.toastr.success('Tour edited','Success');
              this.router.navigate(['tour']);
            },
            error: () =>{
              this.toastr.error('There was an error while trying to edit a tour','Error');
            }
          });
          break;
      }
    }else{
      console.log("Nevalidna tura");
      console.log(this.tour);
    }
  }

  async cancelCreation() {
    if (this.mode === TourCreationMode.Create) {
      this.router.navigate(['tour']);
      return;
    }
    await this.deleteKeypoints();
    this.service.deleteTour(this.tour.id!).subscribe({
      next: () => {
        this.router.navigate(['tour']);
        this.toastr.success('Tour deleted','Success');
      },
      error: () =>{
        this.toastr.error('There was an error while trying to delete a tour','Error');
      }
    });
  }

  cancelUpdate(){
    if (this.mode === TourCreationMode.Edit) {
      this.router.navigate(['tour']);
      return;
    }
  }

  private async deleteKeypoints() {
    this.tour.keyPoints.forEach((keypoint) => {
      this.service.deleteTourKeyPoint(keypoint.id!).subscribe(
        {
          next: () => {
            this.toastr.success('Keypoint deleted','Success');
          },
          error: () =>{
            this.toastr.error('There was an error while trying to delete a keypoint','Error');
          }
        }
      );
    });
  }
}

enum TourCreationMode {
  Create, // Creation of a new tour
  Edit, // Editing an existing tour
}