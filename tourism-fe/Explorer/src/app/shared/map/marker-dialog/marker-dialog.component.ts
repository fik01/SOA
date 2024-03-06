import { Component,EventEmitter,Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Facility } from 'src/app/feature-modules/tour-authoring/model/facility.model';
import { TourAuthoringService } from 'src/app/feature-modules/tour-authoring/tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';


@Component({
  selector: 'xp-marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.css']
})
export class MarkerDialogComponent {
    
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();
  

    constructor(@Inject(MAT_DIALOG_DATA) public data: Facility, private authService:AuthService,
    private tourAuthoringService:TourAuthoringService, private dialogRef: MatDialogRef<MarkerDialogComponent>, private router: Router){}
    
    user = this.authService.user$.getValue();

    updateMarker(){
      this.dialogRef.close();
      this.router.navigate(['facilities/update/', this.data.id]);
    }

    deleteMarker(){

      this.tourAuthoringService.deleteFacility(this.data).subscribe({
        next:()=>{
          console.log("Works");
          this.deleteClicked.emit();
          this.dialogRef.close();
        }
      });
    }
}
