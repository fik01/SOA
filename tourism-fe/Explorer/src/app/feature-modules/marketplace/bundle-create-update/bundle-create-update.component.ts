import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tour } from '../model/tour.model';

import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarketplaceService } from '../marketplace.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Bundle } from '../model/bundle.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'xp-bundle-create',
  templateUrl: './bundle-create-update.component.html',
  styleUrls: ['./bundle-create-update.component.css']
})

export class BundleCreateUpdateComponent implements OnInit{
  tours: Tour[] = [];
  selectedTours:Tour[]=[];
  user:User;
  calculate_sum:number=0;
  update:boolean=false;
  id:number;
  constructor(private tourService: MarketplaceService, private authService: AuthService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService){}

  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
    this.route.params.subscribe(params => {
      this.id=params['id'];
    });
    
    this.tourService.getToursByAuthorId(this.user.id).subscribe({
      next:(result: PagedResults<Tour>) => {
        this.tours = result.results;
        if(this.id){
          this.updateSetup();
        }
      }
    });
  }

  updateSetup() {
    this.tourService.getBundleById(this.id).subscribe({
      next: (result: Bundle) => {
        this.bundleCreateForm.setValue({
          name: result.name,
          price: result.price.toString()
        });
        this.selectedTours = this.tours.filter(item => result.toursId.includes(item.id || 0));
        this.tours = this.tours.filter(item => !result.toursId.includes(item.id || 0));
      }
    });
  }

  isNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (isNaN(value)) {
      return { 'notANumber': true };
    }

    return null;
  }

  bundleCreateForm=new FormGroup({
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required,this.isNumberValidator])
  });
  
  drop(event: CdkDragDrop<Tour[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.calculate_sum=0;
      this.selectedTours.forEach(element => {
        this.calculate_sum+=element.price;
      });
    }
  }

  createBundleClick():void{
    if(this.bundleCreateForm.valid && this.selectedTours.length>1){
      let bun:Bundle={
        name: this.bundleCreateForm.value.name || "",
        price: Number(this.bundleCreateForm.value.price),
        authorId: this.user.id,
        toursId: this.selectedTours.map(tour => tour.id) as number[],
        bundleState: 0
      }
      console.log(bun)
      this.tourService.createBundle(bun).subscribe({
        next:() => {
          this.toastr.success('Bundle created','Success');
          this.router.navigate(['bundle-view']);
        },
        error: () => {
          this.toastr.error('There was an error while trying to create a bundle','Error');
        },
      })
    }
    else{
      this.toastr.warning('Please fill all of the required fields','Warning');
    }
  }

  updateBundleClick():void{
    if(this.bundleCreateForm.valid && this.selectedTours.length>1){
      let bun:Bundle={
        id: this.id,
        name: this.bundleCreateForm.value.name || "",
        price: Number(this.bundleCreateForm.value.price),
        authorId: this.user.id,
        toursId: this.selectedTours.map(tour => tour.id) as number[],
        bundleState: 0 //promeniti ovo, nece sigurno biti ovako
      }
      console.log(bun)
      this.tourService.updateBundle(bun).subscribe({
        next:() => {
          this.toastr.success('Bundle created','Success');
          this.router.navigate(['bundle-view']);
        },
        error: () => {
          this.toastr.error('There was an error while trying to create a bundle','Error');
        },
      })
    }
    else{
      this.toastr.warning('Please fill all of the required fields','Warning');
    }
  }
}
