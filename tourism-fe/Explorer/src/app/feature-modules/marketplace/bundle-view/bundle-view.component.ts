import { Component, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';


@Component({
  selector: 'xp-bundle-view',
  templateUrl: './bundle-view.component.html',
  styleUrls: ['./bundle-view.component.css']
})
export class BundleViewComponent implements OnInit{
  user:User;
  bundles:Bundle[]=[];
  tours: Tour[] = [];
  constructor(private authService: AuthService, private router:Router, private service:MarketplaceService, private tourService: TourAuthoringService, private toastr: ToastrService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
    this.service.getBundlesByAuthorId(this.user.id).subscribe({//treba getByAuthorId()!!!!!
      next:(result: PagedResults<Bundle>) => {
        this.bundles = result.results.sort((a, b) => a.name.localeCompare(b.name));
        this.service.getToursByAuthorId(this.user.id).subscribe({
          next:(result: PagedResults<Tour>) => {
            this.tours = result.results;
          }
        })
      }
    });
  }
  
  navigateCreate(){
    this.router.navigate(['/bundle-create']);
  }

  navigateUpdate(id:number,authorId:number){
    if(this.user.id==authorId){
      this.router.navigate(['/bundle-update/'+id]);
    }
  }

  archiveBundle(bundle: Bundle) {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "archive", type: "bundle", title: bundle.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(bundle.authorId == this.user.id)
        {
          bundle.bundleState = 2;
          this.service.archiveBundle(bundle).subscribe({
            next:() => {
              this.toastr.success('Bundle archived','Success');
              this.service.getAllBundles().subscribe({
                next: (result: PagedResults<Bundle>) => {
                  this.bundles = result.results.sort((a, b) => a.name.localeCompare(b.name));
                }
              })
            },
            error: () => {
              this.toastr.error('There was an error while trying to archive a bundle','Error');
            },
          })
        }
      }
    })
  }

  deleteBundle(selectedBundle: Bundle, authorId:number){
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "bundle", title: selectedBundle.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(authorId==this.user.id){
          this.service.deleteBundle(selectedBundle.id!).subscribe({
            next:() => {
              this.toastr.success('Bundle deleted','Success');
              this.bundles=this.bundles.filter(bundle => bundle.id!==selectedBundle.id).sort((a, b) => a.name.localeCompare(b.name))
            },
            error: () => {
              this.toastr.error('There was an error while trying to delete a bundle','Error');
            },
          });
        }
        else{
          this.toastr.error('Only the creator of bundle can delete it','Error');
        }
      }
    })
  }

  numberOfPublishedToursInBundle(bundle: Bundle): number {
    let numberOfPublishedTours: number = 0
    let selectedToursForBundle: Tour[] = [];
    selectedToursForBundle = this.tours.filter(item => bundle.toursId.includes(item.id || 0));
    numberOfPublishedTours = selectedToursForBundle.length;
    return numberOfPublishedTours;
  }

  publishBundle(bundle: Bundle) {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "publish", type: "bundle", title: bundle.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(bundle.authorId == this.user.id)
        {
          bundle.bundleState = 1;
          this.service.publishBundle(bundle).subscribe({
            next:() => {
              this.service.getAllBundles().subscribe({
                next: (result: PagedResults<Bundle>) => {
                  this.bundles = result.results.sort((a, b) => a.name.localeCompare(b.name));
                  this.toastr.success('Bundle published','Success');
                }
              })
            },
            error: () => {
              this.toastr.error('There was an error while trying to publish a bundle','Error');
            },
          })
        }
      }
    })
  }
}
