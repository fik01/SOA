import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tour } from 'src/app/feature-modules/tour-execution/model/tour-model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Coupon } from '../model/coupon.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'xp-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.css']
})
export class CouponDialogComponent {

  currentDate = new Date();
  discount = 0
  tours : Tour[]
  couponCode: string = '';

  constructor(
    public dialogRef: MatDialogRef<CouponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemsInCart: Tour[] },
    private service: ShoppingCartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchTourData();
  }

  fetchTourData(): void {

        this.tours = this.data.itemsInCart ;
        //console.log(this.tours)
  }
  submitted: boolean = false;
  isEmpty:boolean=true;
  onFocus():void
  {
    if(this.couponCode!==null && this.couponCode!==undefined && this.couponCode!=='')
      this.isEmpty=false;
    else
      this.isEmpty=true;
    console.log(this.couponCode)
    console.log(this.isEmpty)
  }
  submitCoupon(): void {
    this.submitted=true;
    if(!this.isEmpty)
 {     this.service.getCoupon(this.couponCode).subscribe((coupon) => {
          if(coupon!=null) {

            if(coupon.isUsed) this.toastr.error('Code has already been used','Error');

            if (coupon.expirationDate) {
              const expirationDate = new Date(coupon.expirationDate);

              if (expirationDate > this.currentDate) {

                if (coupon.tourId) {
                   const foundTour =  this.tours.find(tour => tour.id === coupon.tourId);
                   
                   if (foundTour) {
                    this.discount = Math.floor(coupon.discount * foundTour.price);
                    coupon.isUsed = true
                    this.service.updateCoupon(coupon).subscribe({
                      next: (result: Coupon) => {
                        
                        this.dialogRef.close({ success: true, discount: this.discount });
                      }
                    })
                   } else {
                    this.toastr.error('No matching tour in shopping cart to discard','Error');
                   }  
                } else {

                  this.tours.forEach(tour => {
                    if (tour.authorId === coupon.authorId) {
                      
                      this.discount = this.discount + Math.floor(coupon.discount * tour.price);
                    }
                  });
                  coupon.isUsed = true
                  this.service.updateCoupon(coupon).subscribe({
                    next: (result: Coupon) => {
                      this.dialogRef.close({ success: true, discount: this.discount });
                    }
                  })
                }
                     
              } else this.toastr.error('Coupon has expired','Error');
          } else {

            if (coupon.tourId) {
               const foundTour =  this.tours.find(tour => tour.id === coupon.tourId);
               
               if (foundTour) {
                this.discount =  Math.floor(coupon.discount * foundTour.price);
                coupon.isUsed = true
                this.service.updateCoupon(coupon).subscribe({
                  next: (result: Coupon) => {
                    this.dialogRef.close({ success: true, discount: this.discount });
                  }
                })
               } else {
                this.toastr.error('No matching tour in shopping cart to discard','Error');
               }  
            } else {

              this.tours.forEach(tour => {
                if (tour.authorId === coupon.authorId) {
                  
                  this.discount = this.discount +  Math.floor(coupon.discount * tour.price);
                }
              });
              coupon.isUsed = true
              this.service.updateCoupon(coupon).subscribe({
                next: (result: Coupon) => {
                  this.dialogRef.close({ success: true, discount: this.discount });
                }
              })
            }
          }
        } 
          else this.toastr.error('Coupon has expired','Error');
        },
        error => {
          this.toastr.error('Coupon does not exist','Error');
        }
      );
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

}

