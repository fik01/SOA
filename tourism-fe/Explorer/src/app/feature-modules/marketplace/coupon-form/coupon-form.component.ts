import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Coupon } from '../model/coupon.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit{

  user: User;
  title: string;
  tours: Tour[];
  coupon: Coupon = {
    code: '',
    discount: 0,
    expirationDate: undefined,
    tourId: 0,
    authorId: 0
  };
  selectedCoupon: Coupon

  couponForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    discount: new FormControl(0, [Validators.required, Validators.min(1)]),
    expirationDate: new FormControl(new Date()),
    tourId: new FormControl(0)
  })

  constructor(public dialogRef: MatDialogRef<CouponFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, coupon: Coupon, title: string},
    private service: MarketplaceService,
    private tourAuthoringService: TourAuthoringService,
    private toastr: ToastrService
  ) {
    this.title = data.title
    this.user = data.user
    this.selectedCoupon = data.coupon
  }

  ngOnInit(): void {
    this.tourAuthoringService.getToursByAuthorId(this.user.id).subscribe({
      next: (result => this.tours = result.results)
    })
    if (this.title == 'Edit') {
      this.couponForm.patchValue(this.selectedCoupon);
      this.couponForm.patchValue({ discount: this.selectedCoupon.discount * 100});
    }
    else {
      this.couponForm.patchValue({ expirationDate: undefined});
    }
  }

  generateCode(): void {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedCode = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedCode += characters.charAt(randomIndex);
    }

    this.couponForm.get('code')?.setValue(generatedCode);
  }

  submit(): void {
    this.coupon.code = this.couponForm.value.code || "";
    this.coupon.discount = this.couponForm.value.discount! / 100 || 0;
    this.coupon.expirationDate = this.couponForm.value.expirationDate || undefined;
    if (this.couponForm.value.tourId == 0)
      this.coupon.tourId = undefined
    else
      this.coupon.tourId = this.couponForm.value.tourId || 0;
    this.coupon.authorId = this.user.id;
    
    if (this.title == 'Create') {
      this.service.createCoupon(this.coupon).subscribe({
        next: (result: Coupon) => {
          
          window.location.reload();
          this.toastr.success('Coupon created','Success');
        },
        error: () => {
          this.toastr.error('There was an error while trying to create a coupon','Error');
        },
      })
    }
    else {
      this.coupon.id = this.selectedCoupon.id;
      if (this.coupon.tourId == 0){
        this.coupon.tourId = undefined
      }
      this.service.updateCoupon(this.coupon).subscribe({
        next: (result: Coupon) => {
          
          window.location.reload();
          this.toastr.success('Coupon updated','Success');
        },
        error: () => {
          this.toastr.error('There was an error while trying to update a coupon','Error');
        },
      })
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }
}

