import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../model/request.model';
import { UserPendingReqService } from './user-pending-req.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserRequest } from '../model/userRequest.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-user-pending-req',
  templateUrl: './user-pending-req.component.html',
  styleUrls: ['./user-pending-req.component.css']
})
export class UserPendingReqComponent implements OnInit {

  requests: UserRequest[] = [];
  OwnerId: number;
  @Input() ClubId: number;
  

  constructor(private service: UserPendingReqService,private authService: AuthService,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.OwnerId = this.authService.user$.getValue().id;

    this.getRequests();
  }



  acceptRequest(userrequest: UserRequest) {

    let updated: Request = {
      id: userrequest.id,
      clubId: userrequest.clubId,
      userId: userrequest.userId,
      requestDirection: userrequest.requestDirection,
      requestStatus: "accepted"
            
    };

    this.service.updateRequest(updated).subscribe({
      next: () => {
         this.getRequests();
         this.toastr.success('Request accepted','Success');
       },
       error: () => {
        this.toastr.error('There was an error while trying to add a request','Error');
      },
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
    this.service.updateRequest(updated).subscribe({
      next: () => { 
        this.getRequests(); 
        this.toastr.success('Request declined','Success');
      },
      error: () => {
        this.toastr.error('There was an error while trying to decline a request','Error');
      },
    });
  }

  getRequests(): void {
    this.service.getUserRequests(this.ClubId).subscribe(res => {this.requests = res;
      })
    
  }
}