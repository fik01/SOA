import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { TourPreferences } from '../model/tour-preferences.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-tour-preferences',
  templateUrl: './tour-preferences.component.html',
  styleUrls: ['./tour-preferences.component.css']
})
export class TourPreferencesComponent implements OnInit {
  hasPreferences: boolean
  tourPreference : TourPreferences = {
    difficultyLevel: NaN,
    walkingRate: NaN,
    bicycleRate: NaN,
    carRate: NaN,
    boatRate: NaN,
    tags: []
  } 

  constructor(private service: MarketplaceService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this.getPreferences()
  }

  getPreferences(): void{
    this.service.getPreference().subscribe({
      next:(result : TourPreferences) => {
        if(!result){
          this.hasPreferences = false
        }
        else{
          this.tourPreference = result
          this.hasPreferences = true
          console.log(result)
        }
        
      },
      error: () =>{
        console.log(console.error())
      }
    }) 
  }

  deletePreferences(): void{
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "preference", title: ' '},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deletePreference(this.tourPreference.id || 0).subscribe({
          next: (_) => {
            console.log("Uspesno obrisan");
            this.toastr.success('Preferences successfully deleted','Success');
            this.hasPreferences = false
          },
          error: () =>{
            this.toastr.error('There was an error while trying to delete preferences','Error');
          }
        })
      }
    })
  }
}
