import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserInformation } from '../model/user_information.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from '../model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import * as signalR from "@microsoft/signalr";
import {environment} from "../../../../env/environment";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { AddCoinsAlertDialogComponent } from 'src/app/shared/dialogs/add-coins-alert-dialog/add-coins-alert-dialog.component';

@Component({
  selector: 'xp-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit{

    users:UserInformation[]=[];
    userToBlock = {} as User;


    constructor(private service:AdministrationService, private toastr: ToastrService, public dialog: MatDialog) { }

    ngOnInit(): void {
      this.service.getUserInformation().subscribe({
        next:(result:PagedResults<UserInformation>)=>{
          this.users=result.results.sort((a,b)=>{return a.userId-b.userId});
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }

    OnBlockClicked(user: UserInformation):void{
      this.userToBlock.id=user.userId;
      this.userToBlock.username=user.username
      this.userToBlock.role=user.role
      this.userToBlock.isActive=user.isActive
      this.userToBlock.password=user.password

      const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
        data: {operation: "block", type: "user", title: this.userToBlock.username},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.blockUser(this.userToBlock).subscribe({
            next:(_)=>{
              this.toastr.success('User successfully blocked','Success');
              this.ngOnInit()
            }
          })
        }
      })
    }

    addCoins(user: UserInformation,coinsStr:string): void{
      let coins = Number(coinsStr)

      const dialogRef = this.dialog.open(AddCoinsAlertDialogComponent, {
        data: {operation: "add coins", numberOfCoins: coins, type: "user", username: user.username},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.addCoins(user.userId, coins).subscribe({
            next: (response) => {
              this.toastr.success('Coinst added to wallet','Success');
              user.balance += coins;
              this.sendNotification(user.userId.toString(),coins.toString(),user.balance.toString())
            },
            error: (error) => {
              this.toastr.error('There was an error while adding coins','Error');
            }
          });
        }
      })
    }

    sendNotification(recipientId: string,  addedCoins: string,  balance: string): void{

      let hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.socketHost,{
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();

      hubConnection.start().then(() => {
        hubConnection.invoke("BalanceChanged",recipientId,addedCoins,balance).then(() => {
          hubConnection.stop();
        });
      })
        .catch((err) => {
        console.error(err);
      });

    }
}
