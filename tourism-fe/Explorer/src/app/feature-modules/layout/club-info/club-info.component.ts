import { Component, Inject, Input, OnInit } from '@angular/core';
import { Club } from '../model/club.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { ClubKickService } from '../club-kick/club-kick.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ClubMember } from '../model/club-user/club-user.model';
import { UserRequest } from '../model/userRequest.model';
import { UserPendingReqService } from '../user-pending-req/user-pending-req.service';
import { Request } from '../model/request.model';

@Component({
  selector: 'xp-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})

export class ClubInfoComponent implements OnInit {

  ClubMembers: ClubMember[] = [];
  TotalCount: number;
  requests: UserRequest[] = [];
  isDisabled: boolean = true;
  userId: number
  
    clubForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl({ value: '', disabled: true }, [Validators.required]),
      clubPicture: new FormControl({ value: '', disabled: true },[Validators.required]),
      
    })
  
    constructor(
      public dialogRef: MatDialogRef<ClubInfoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { Club: Club },
      private authService: AuthService,
      private service: LayoutService,
      private kickService: ClubKickService,
      private requestService: UserPendingReqService
    ) { }

  ngOnInit(): void {
    if (this.data.Club) {
      this.clubForm.patchValue({
        name: this.data.Club.name,
        description: this.data.Club.description,
        clubPicture: this.data.Club.clubPicture
      });
    }
    this.userId = this.authService.user$.getValue().id;
    this.getMembers(1);
    this.getRequests()
  }

  enableUpdate(): void {
    if (!this.isDisabled) {
      if (Object.values(this.clubForm.value).some(value => value === '')) {
        console.log('All fields must be filled.');
        return;
      }
  
      this.clubForm.disable({ onlySelf: true, emitEvent: false });
      this.setDataValues();
  
      const club: Club = {
        name: this.clubForm.value.name || "",
        description: this.clubForm.value.description || "",
        clubPicture: this.clubForm.value.clubPicture || "",
      };
      club.id = this.data.Club.id;
      club.touristId = this.userId;

      this.service.updateClub(club).subscribe({
        next: (_) => { 
        }
      });
    } else {
      this.clubForm.enable({ onlySelf: true, emitEvent: false });
      this.isDisabled = false;
    }
  }

  setDataValues(): void {
    this.data.Club.name = this.clubForm.value.name || '';
    this.data.Club.description = this.clubForm.value.description || '';
    this.data.Club.clubPicture = this.clubForm.value.clubPicture || '';
    
  }

  getMembers(PageIndex: number) : void {
    this.kickService.getClubMembers(this.data.Club.id!,PageIndex).subscribe({
      next: (result: PagedResults<ClubMember>) => {
        this.ClubMembers = result.results;
        this.TotalCount = result.totalCount;
      }
    });
  }

  kickMember(MemberId: number): void {
    this.kickService.kickClubMember(this.data.Club.id!,MemberId).subscribe({
      next: (result: ClubMember) => {
        alert('User kicked successfully')
        this.getMembers(1)
      },
      error: err => { alert('Error While Kicking User!')}
    })
  }


  acceptRequest(userrequest: UserRequest) {

    let updated: Request = {
      id: userrequest.id,
      clubId: userrequest.clubId,
      userId: userrequest.userId,
      requestDirection: userrequest.requestDirection,
      requestStatus: "accepted"
            
    };

    this.requestService.updateRequest(updated).subscribe({
      next: () => { this.getRequests(); this.getMembers(1);  }
    });
  }

  declineRequest(userrequest: UserRequest) {
    let updated: Request = {
      id: userrequest.id,
      clubId: userrequest.clubId,
      userId: userrequest.userId,
      requestDirection: userrequest.requestDirection,
      requestStatus: "declined"
            
    };
    this.requestService.updateRequest(updated).subscribe({
      next: () => { this.getRequests(); }
    });
  }

  getRequests(): void {
    this.requestService.getUserRequests(this.data.Club.id!).subscribe(res => {this.requests = res;
      })
    
  }



}
