import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Coupon } from '../model/coupon.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatDialog } from '@angular/material/dialog';
import { CouponFormComponent } from '../coupon-form/coupon-form.component';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit {

  user: User;
  coupons: Coupon[];
  tours: Tour[];

  constructor(
    private service: MarketplaceService, 
    private authService: AuthService,
    private dialog: MatDialog,
    private tourAuthoringService: TourAuthoringService,
    private toastr: ToastrService) 
  {
    this.user = this.authService.user$.getValue();
  }

  ngOnInit(): void {
    this.service.getCouponsByAuthorId(this.user.id).subscribe({
      next: (result: PagedResults<Coupon>) => {
        this.coupons = result.results;
        this.coupons.forEach(element => {
          if (element.expirationDate == undefined)
            element.formattedDate = 'Never'
          else
            element.formattedDate = new Date(element.expirationDate!).toLocaleDateString('en-GB');
        });
        this.tourAuthoringService.getToursByAuthorId(this.user.id).subscribe({
          next: (result => this.tours = result.results),
          complete: (): void => {
            this.coupons.forEach(element => {
              if (element.tourId == null)
                element.tourName = 'All tours'
              else if (this.tours.find(x => x.id == element.tourId) == null)
                this.coupons.slice(this.coupons.indexOf(element), 1)
              else
                element.tourName = this.tours.find(x => x.id == element.tourId)?.name
            })
            this.coupons.sort((a, b) => {
              if (a.isUsed && !b.isUsed) {
                return -1;
              }
              else if (!a.isUsed && b.isUsed) {
                return 1;
              }
              else {
                return 0;
              }
            });
          }
        })
      },
      error: (error: any) => console.log(error)
    });
  }

  openCreateCouponForm() : void {
    const dialog = this.dialog.open(CouponFormComponent, {
      width: '40vw',
      height: '80vh',
      data: { title: 'Create', user: this.user }
    })
  }

  removeCoupon(coupon: Coupon) {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "coupon", title: coupon.code},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteCoupon(coupon.id!).subscribe({
          next: (result => {
            window.location.reload();
            this.toastr.success('Coupon deleted','Success');
          }),
          error: () => {
            this.toastr.error('There was an error while trying to delete a coupon','Error');
          },
        })
      }
    })
  }

  openEditCouponForm(coupon: Coupon) {
    const dialog = this.dialog.open(CouponFormComponent, {
      width: '40vw',
      height: '80vh',
      data: { title: 'Edit', user: this.user, coupon: coupon }
    })
  }
}
