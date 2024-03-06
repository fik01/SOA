import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { TourPreferences } from '../model/tour-preferences.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputTags } from '../model/input-tags.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'xp-tour-preferences-form',
  templateUrl: './tour-preferences-form.component.html',
  styleUrls: ['./tour-preferences-form.component.css']
})
export class TourPreferencesFormComponent {
  preferenceCreated : boolean = false
  Tags : Array<InputTags> = []
  preferencesForm = new FormGroup({
    difficultyLevel: new FormControl(null),
    walkingRate: new FormControl(null),
    bicycleRate: new FormControl(null),
    carRate: new FormControl(null),
    boatRate: new FormControl(null)
  })

  constructor(private service: MarketplaceService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService){}

  createPreferences(): void{
    console.log(this.preferencesForm.value)

    let tagsList = []
    for(let t of this.Tags){
      console.log(t)
      console.log(t.name)
      console.log(t.id)
      tagsList.push(t.name);
    }

    const preferences: TourPreferences = {
      difficultyLevel: this.preferencesForm.value.difficultyLevel || 1,
      walkingRate: this.preferencesForm.value.walkingRate || 0,
      bicycleRate: this.preferencesForm.value.bicycleRate || 0,
      carRate: this.preferencesForm.value.carRate || 0,
      boatRate: this.preferencesForm.value.boatRate || 0,
      tags: tagsList
    }

    console.log("Posle dodeljivanja");
    console.log(preferences);
    console.log("TAGS")
    console.log(preferences.tags);

    if (
      (preferences.difficultyLevel < 1 || preferences.difficultyLevel > 5 || !preferences.difficultyLevel ) ||
      (preferences.walkingRate < 0 && preferences.walkingRate > 3 || preferences.walkingRate === null)||
      (preferences.bicycleRate < 0  && preferences.bicycleRate > 3 || preferences.bicycleRate === null) ||
      (preferences.carRate < 0 &&  preferences.carRate > 3 || preferences.carRate === null) ||
      (preferences.boatRate < 0 && preferences.boatRate > 3 || preferences.boatRate === null) ||
      preferences.tags.length == 0
    ) {
      this.toastr.warning('All fields must be entered!','Warning');
    }
    else{
      this.service.createPreferences(preferences).subscribe({
        next: (result) => {
          if(result){
            this.preferenceCreated = true
            this.toastr.success('Preferences created','Success');
          }
        },
        error: () =>{
          console.log(console.error());
          this.toastr.error('Failed to create!','Error');
        }
      });
    }
  }
}