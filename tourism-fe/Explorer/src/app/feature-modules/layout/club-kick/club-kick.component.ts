import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ClubMember} from "../model/club-user/club-user.model";
import {ClubKickService} from "./club-kick.service";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-club-kick',
  templateUrl: './club-kick.component.html',
  styleUrls: ['./club-kick.component.css']
})
export class ClubKickComponent implements OnInit{

  ClubMembers: ClubMember[] = [];
  TotalCount: number;
  @Input() ClubId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClubKickService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getMembers(1);
  }

  getMembers(PageIndex: number) : void {
    this.service.getClubMembers(this.ClubId,PageIndex).subscribe({
      next: (result: PagedResults<ClubMember>) => {
        this.ClubMembers = result.results;
        this.TotalCount = result.totalCount;
      }
    });
  }

  kickMember(MemberId: number): void {
    this.service.kickClubMember(this.ClubId,MemberId).subscribe({
      next: (result: ClubMember) => {
        this.toastr.success('User kicked','Success');
        if(this.ClubMembers.length == 1 && this.paginator.pageIndex != 0)
        {
          this.getMembers(this.paginator.pageIndex);
        }else{
          this.getMembers(this.paginator.pageIndex+1);
        }
      },
      error: err => { 
        this.toastr.error('There was an error while trying to kick','Error');
      }
    })
  }

  onPageChange(event: PageEvent): void{
    this.getMembers(event.pageIndex+1);
  }


}
