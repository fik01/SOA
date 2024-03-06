import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ClubMember} from "../model/club-user/club-user.model";
import {ClubInviteService} from "./club-invite.service";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-club-invite',
  templateUrl: './club-invite.component.html',
  styleUrls: ['./club-invite.component.css']
})
export class ClubInviteComponent implements OnInit{

  InvitableUsers: ClubMember[] = [];
  TotalCount: number;
  @Input() ClubId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service: ClubInviteService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getInvitableUsers(1);
  }



  getInvitableUsers(PageIndex: number): void{
    this.service.getInvitableUsers(this.ClubId,PageIndex).subscribe({
      next: (result: PagedResults<ClubMember>) =>
      {
        this.InvitableUsers = result.results;
        this.TotalCount = result.totalCount;
      }
    });
  }

  inviteUser(UserId: number): void{
    this.service.inviteUser(this.ClubId,UserId).subscribe({
      next: (result: ClubMember) =>{
        this.toastr.success('User invited','Success');
          if(this.InvitableUsers.length == 1 && this.paginator.pageIndex != 0)
            {
              this.getInvitableUsers(this.paginator.pageIndex);
            }else{
              this.getInvitableUsers(this.paginator.pageIndex+1);
          }
        },
      error: err => {
        this.toastr.error('There was an error while inviting a user','Error');
      }
    })
  }

  onPageChange(event: PageEvent): void{
    this.getInvitableUsers(event.pageIndex+1);
    console.log(this.InvitableUsers);
  }

}
