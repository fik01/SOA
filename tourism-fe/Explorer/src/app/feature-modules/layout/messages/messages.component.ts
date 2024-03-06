import { Component } from '@angular/core';
import { Message } from '../model/message.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AdministrationService } from '../../administration/administration.service';
import { User } from '../../administration/model/user.model';
import { Person } from 'src/app/shared/model/person.model';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/env/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  myFollowers: Person[] = [];
  myFollowings: Person[] = [];
  isCreateMessageVisible = false;
  newMessageContent: string = '';
  messageContent: string = '';
  selectedRecipientId: number;
  followersIds: number[] = [];
  allMessages: Message[] = [];
  myMessages: Message[] = [];
  chatMessages: Message[] = [];
  chatIds: number[] = [];
  selectedFollowerChat: Person;
  user = this.authService.user$.getValue();
  private hubConnection: signalR.HubConnection;
  messagedPeople: Person[] = [];
  people: Person[] = [];
  messagesAreEmpty: boolean = false;
  followersAreEmpty: boolean = false;

  constructor(private service: LayoutService, private authService: AuthService, private administrationService: AdministrationService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedRecipientId = 0;
    this.newMessageContent = '';
    this.getFollowers();
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketHost, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
      this.hubConnection.start().catch((err) => {
      console.error(err);
    });
  }

  toggleCreateMessage(): void {
    this.isCreateMessageVisible = !this.isCreateMessageVisible;
  }

  createMessageNotVisible(): void {
    this.isCreateMessageVisible = false;
  }

  selectReceiver(id: number):void{
    this.selectedRecipientId = id;
  }

  getFollowers(): void {
    this.service.getFollowers(this.user.id, this.user.role).subscribe({
      next: (result) =>{
        this.myFollowers = result;
        this.getFollowings();
        this.getFollowersIds();
        if(this.myFollowers.length == 0){
          this.followersAreEmpty = true;
        }
      },     
      error: () => {
        console.log(console.error);
      }
    })
  }
  
  getFollowersIds(): void {
    for (let follower of this.myFollowers) {
      this.followersIds.push(follower.id);
    }
    this.getAllMessages();
  }

  
  getAllMessages() : void {
    this.service.getAllMessages(this.user.role).subscribe({
      next: (result: PagedResults<Message>) => {
        this.allMessages = result.results;
        this.getMyMessages();
      },
      error: () => {
        console.log(console.error);
      }
    })
  }

  getMyMessages() : void {
    for (let message of this.allMessages) {
      if(!this.messageExists(message)
          && (message.senderId === this.user.id || message.recipientId === this.user.id)
       ) {
        this.myMessages.push(message);
      }
    }

    if(this.myMessages.length == 0){
      this.messagesAreEmpty = true;
    }

    this.getMessagedFollowerIds();
  }
  
  messageExists(newMessage: Message): boolean {
    return this.myMessages.some(message => message.id === newMessage.id);
  }  
  
  getMessagedFollowerIds() : void {
    for (let message of this.myMessages) {
      if(message.senderId && message.senderId !== this.user.id && !this.chatIds.includes(message.senderId)) {
        this.chatIds.push(message.senderId);
      } else if (message.recipientId &&  message.recipientId !== this.user.id && !this.chatIds.includes(message.recipientId)) {
        this.chatIds.push(message.recipientId);
      }
    }
    this.getMessagedPeople(this.chatIds);
  }

  getMessagedPeople(chatIds: number[]) : void {
    this.messagedPeople = [];
    for(let person of this.people){
      if(this.chatIds.includes(person.id)){
        this.messagedPeople.push(person);
      }
    }
}

  sendMessage(): void {
    const newMessage: Message = {
      content: this.newMessageContent,
      creationTime: new Date(),
      senderId: this.user.id,
      recipientId: this.selectedRecipientId,
      senderUsername: this.user.username,
      recipientUsername: '',
    };
    
    this.service.sendMessage(newMessage, this.user.role).subscribe({
      next: () => {
        this.hubConnection
          .invoke('SendFollowerMessageNotification', this.selectedRecipientId, this.user.username)
          .catch((err) => {
            console.error(err);
          });
        this.getAllMessages();
        this.newMessageContent = '';
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.messagesAreEmpty = false;
    this.createMessageNotVisible();
  }

  sendMessageFromChat(): void {
    const newMessage: Message = {
      content: this.messageContent,
      creationTime: new Date(),
      senderId: this.user.id,
      recipientId: this.selectedFollowerChat.userId,
      senderUsername: this.user.username,
      recipientUsername: '',
    };
    this.service.sendMessage(newMessage, this.user.role).subscribe({
      next: () => {
        this.hubConnection
          .invoke('SendFollowerMessageNotification', newMessage.recipientId, this.user.username)
          .catch((err) => {
            console.error(err);
          });
        this.getAllMessages();
        this.messageContent = '';
        this.chatMessages.push(newMessage);
      }
    })
 }

  openChat(follower: Person): void {
    this.selectedFollowerChat = follower;
    this.getChatMessages(follower);
  }

  getChatMessages(follower: Person): void {
    this.chatMessages=[];
    for (let message of this.myMessages) {
      if(message.senderId === this.selectedFollowerChat.id || message.recipientId === this.selectedFollowerChat.id) {
        this.chatMessages.push(message);
      }
    }
  }

  sortChatMessages(): void {
    this.sortChatMessages();
    this.chatMessages.sort((a, b) => {
      const timeA = new Date(a.creationTime).getTime();
      const timeB = new Date(b.creationTime).getTime();
      return timeA - timeB;
    });
  }

  getFollowings(): void {
    this.service.getFollowings(this.user.id, this.user.role).subscribe({
      next: (result) =>{
        this.myFollowings = result;
        this.getAllPersons();
      },     
      error: () => {
        console.log(console.error);
      }
    })
  }

  getAllPersons(): void {
    for (let el of this.myFollowers){
      if(!(this.people.some(person => person.id === el.id))){
        this.people.push(el);
      }
    }
    for (let el of this.myFollowings){
      if(!(this.people.some(person => person.id === el.id))){
        this.people.push(el);
      }
    }
  }

  deleteMessage(message : Message): void {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "message", title: message.content},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = message.id;
        if (index !== -1 && index) {
          this.chatMessages.splice(index, 1);
          this.service.deleteMessage(this.user.role, index).subscribe({
           next: () => {
           this.getAllMessages();
           this.getMyMessages();
           this.toastr.success('Message deleted','Success');
           },
           error: () => {
            this.toastr.error('There was an error while trying to delete a message','Error');
           }
          })
        }
      }
    })
  }
}
