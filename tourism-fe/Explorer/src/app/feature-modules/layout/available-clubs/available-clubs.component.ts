import { Component } from '@angular/core';
import { Club } from '../model/club.model';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AvailableClubsService } from './available-clubs.service';

@Component({
  selector: 'xp-available-clubs',
  templateUrl: './available-clubs.component.html',
  styleUrls: ['./available-clubs.component.css']
})
export class AvailableClubsComponent {
  clubs: Club[] = []
  userId: number

  constructor(private service: AvailableClubsService,private authService: AuthService) { }


  ngOnInit(): void {
    this.userId = this.authService.user$.getValue().id;

    this.getAvailableClubs();
  }

  getAvailableClubs(): void {
    this.service.getAvailableClubs(this.userId).subscribe(res => {this.clubs = res; })    
  }

  acceptRequest(selectedClubId: number): void {
    let lol = {
      Id: 0,
      ClubId: selectedClubId,
      UserId: this.userId,
      RequestStatus: "pending",
      RequestDirection: true
      };
      console.log(lol)

      this.service.sendRequest(lol).subscribe({
        next: () => { this.getAvailableClubs();}
      });  


}
}
