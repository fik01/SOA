import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Club } from '../model/club.model';
import { LayoutService } from '../layout.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-new-club-dialog',
  templateUrl: './new-club-dialog.component.html',
  styleUrls: ['./new-club-dialog.component.css']
})
export class NewClubDialogComponent {

  userHasCreatedClub: boolean = false;
  clubs: Club[]
  userId: number


  constructor(private service: LayoutService, private authService: AuthService,public dialogRef: MatDialogRef<NewClubDialogComponent>,) { }
  
  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;
    this.getClubs()
  }

  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    clubPicture: new FormControl('', [Validators.required])
  });

  addClub(): void {
    const existingClub = this.clubs.find(club => club.touristId === this.userId);

    if (existingClub) {
      alert('You already have a club');
    } else {
      const newClub: Club = {
        name: this.clubForm.value.name || "",
        description: this.clubForm.value.description || "",
        clubPicture: this.clubForm.value.clubPicture || "",
        touristId: this.userId,
      };
      
      this.service.addClub(newClub).subscribe({
        next: (_) => {     
          this.userHasCreatedClub = true;         
          this.dialogRef.close({ success: true });       
        }
      });
    }
  }

  getClubs() {
    this.service.getClubs().subscribe({
      next: (result: PagedResults<Club>) => {
        this.clubs = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}