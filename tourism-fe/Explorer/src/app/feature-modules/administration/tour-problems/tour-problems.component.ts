import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { TourProblem, TourProblemCategory, TourProblemPriority } from '../model/tour-problem.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/env/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'xp-tour-problems',
  templateUrl: './tour-problems.component.html',
  styleUrls: ['./tour-problems.component.css'],
})

export class TourProblemsComponent implements OnInit
{
  tourProblems: TourProblem[] = [];
  selectedDate: Date|null;
  
  constructor(private service: AdministrationService, private toastr: ToastrService, public dialog: MatDialog) { }
  isCalnedar:boolean;
  tourProblemId: number|undefined;
  isValid=true;
  deadlineForm = new FormGroup({
  deadline: new FormControl(null, [Validators.required]),
  });

  private hubConnection: signalR.HubConnection;

  messages=[{
    "senderId": 0,
    "recipientId": 0,
    "creationTime": new Date("2023-11-07T12:34:56.789Z"),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "senderName": "",
    "isRead": false
  }]

  ngOnInit(): void {
    this.getTourProblems();
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

  getTourProblems(): void {
    this.service.getTourProblems().subscribe({
      next: (result: PagedResults<TourProblem>) => {
        this.tourProblems = result.results;
        this.tourProblems.forEach(tp=>tp.messages=this.messages)
        this.sortProblemsByDate();
      },
      error: () => {
      }
    })
  }

  sortProblemsByDate() {
    this.tourProblems.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }

  problemCategoryToString(category: TourProblemCategory | null): string {
    switch (category) {
      case TourProblemCategory.BOOKING:
        return 'Booking';
      case TourProblemCategory.ITINERARY:
        return 'Itinerary';
      case TourProblemCategory.PAYMENT:
        return 'Payment';
      case TourProblemCategory.TRANSPORTATION:
          return 'Transportation';
      case TourProblemCategory.GUIDE_SERVICES:
          return 'Guide services';
      case TourProblemCategory.OTHER:
        return 'Other';
      default:
        return '';
    } 
  }

  problemPriorityToString(priority: TourProblemPriority | null): string {
    switch (priority) {
      case TourProblemPriority.LOW:
        return 'Low';
      case TourProblemPriority.MEDIUM:
        return 'Medium';
      case TourProblemPriority.HIGH:
        return 'High';
      default:
        return '';
    } 
  }

  hasFiveDaysPassed(date: Date, isSolved : boolean, deadlinePast: boolean): boolean {
    const tpDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - tpDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > 5 && !isSolved && deadlinePast;
  }
  selectedRowId: number | undefined;
  DeadlineClicked(id: number|undefined)
  {
    this.isCalnedar=true;
    this.tourProblemId=id;
    this.isValid=true;
    this.selectedRowId = id;
  }

  GiveDeadline()
  {
    let tourProblem=this.FindTourProblem(this.tourProblemId!);
    let present= new Date();
    let deadlineFromForm= new Date(this.deadlineForm.value.deadline!)
    if(deadlineFromForm.getTime() > present.getTime() && this.deadlineForm.valid)
    {
      tourProblem.deadline=this.deadlineForm.value.deadline!;
      this.isValid=true;
      this.service.giveDeadline(tourProblem).subscribe({
        next:()=>{
          this.toastr.success('Deadline date added','Success');
          this.hubConnection
            .invoke('SendDeadlineNotification', tourProblem.authorUsername, tourProblem.id, tourProblem.deadline)
            .catch((err) => {
              console.error(err);
            });
          this.ngOnInit();
          this.selectedRowId = 0;
        },error: () => {
          this.toastr.error('There was an error while adding a deadline date','Error');
        },
      })
    }
        
    else
      this.isValid=false;
   
  }

  HasDeadline(date: Date|null):boolean
  {
    let present=new Date(date!);
    let past= new Date(500000000000);
    return past.getTime()<present.getTime();
  }

  FindTourProblem(id:number):TourProblem
  {
    return this.tourProblems.find(tp=>tp.id===this.tourProblemId)!;
  }

  HasDeadlinePassed(date:Date, isSolved:boolean):boolean
  {
    let deadline=new Date(date);

    let now=new Date()
      return now.getTime()>deadline.getTime() && this.HasDeadline(deadline) && !isSolved;
  }

  GivePenalty(tourProblem: TourProblem)
  {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "Penal", type: "user", title: tourProblem.authorUsername},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Id problema: "+tourProblem.id+"\nId ture: "+tourProblem.tourId+"\nUsername: "+tourProblem.authorUsername);
        this.service.punishAuthor(tourProblem).subscribe({
          next:()=>{
            this.toastr.success('Penalty assigned','Success');
            this.ngOnInit();
          },error: () => {
            this.toastr.error('There was an error while assigning a penalty','Error');
          },
        })
      }
    })
  }
}