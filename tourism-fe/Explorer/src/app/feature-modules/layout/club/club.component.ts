import { Component, OnInit } from '@angular/core';
import { Club } from '../model/club.model';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../layout.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { NewClubDialogComponent } from '../new-club-dialog/new-club-dialog.component';
import { ClubInfoComponent } from '../club-info/club-info.component';
import { AvailableClubsService } from '../available-clubs/available-clubs.service';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  club: Club[] = [];
  selectedClub: Club;
  shouldEdit: boolean;
  shouldRenderClubForm: boolean = false;
  userHasCreatedClub: boolean = false;
  userHasDeletedClub: boolean;
  shouldRenderInviteKick: boolean = false;
  availableClubs: Club[] = [];


constructor(private service: LayoutService, private authService: AuthService, private dialog: MatDialog, private joinService: AvailableClubsService, private toastr: ToastrService,) { }


  ngOnInit(): void {
    this.getClubs();
    this.getAvailableClubs()
  }

  getClubs() {
    this.service.getClubs().subscribe({
      next: (result: PagedResults<Club>) => {
        this.club = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  canUserEdit(club: Club): boolean {
    const canEdit = club.touristId === this.authService.user$.value.id;
    return canEdit;
  }

  canUserDelete(club: Club): boolean {
    const canEdit = club.touristId === this.authService.user$.value.id;
    return canEdit;
  }

  onEditClicked(club: Club): void {
    const dialogRef = this.dialog.open(ClubInfoComponent, {
      height: '400px',
      width: '600px',
      data: { Club: club }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log('Club edited:', result);
        this.getClubs();
      }
    });
  }

  onAddClicked(): void {
    const existingClub = this.club.find(club => club.touristId === this.authService.user$.value.id);

    if (existingClub) {
      this.toastr.error('You already have a club','Error');
    } else {
    const dialogRef = this.dialog.open(NewClubDialogComponent, {
      height: '400px',
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log('Club created:', result);
        this.getClubs();
      }
    });
  }
}

  deleteClub(club: Club): void {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "club", title: club.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteClub(club).subscribe({
          next: (_) => {
            this.getClubs();
            this.userHasCreatedClub = false;
            this.userHasDeletedClub = true;
            this.toastr.success('Club deleted','Success');
          },error: () => {
            this.toastr.error('There was an error while deleting a club','Error');
          },
        });
      }
    })
  }

  joinClub(club: Club): void {

    let request = {
      Id: 0,
      ClubId: club.id,
      UserId: this.authService.user$.value.id,
      RequestStatus: "pending",
      RequestDirection: true
    };

    this.joinService.sendRequest(request).subscribe({
      next: () => {
        alert("Request sent!")
        this.getAvailableClubs();
      }
    });
  }

  getAvailableClubs() {
    this.joinService.getAvailableClubs(this.authService.user$.value.id).subscribe({
      next: (result: Club[]) => {
        this.availableClubs = result
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  clubExistsInAvailableClubs(club: Club): boolean {
    return this.availableClubs.some(availableClub => availableClub.id === club.id);
  }

}
