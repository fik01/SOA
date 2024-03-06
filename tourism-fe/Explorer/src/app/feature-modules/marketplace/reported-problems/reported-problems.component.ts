import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourProblem, TourProblemCategory, TourProblemPriority, Message } from '../model/tour-problem.model';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/env/environment';
import { Tour } from '../model/tour.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'xp-reported-problems',
  templateUrl: './reported-problems.component.html',
  styleUrls: ['./reported-problems.component.css']
})

export class ReportedProblemsComponent implements OnInit {
  user = this.authService.user$.getValue();
  reportedProblems: TourProblem[] = [];
  private hubConnection: signalR.HubConnection;

  constructor(private service: MarketplaceService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getReportedProblems();

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

  getReportedProblems(): void {
    this.service.getReportedProblems(this.user.id, this.user.role).subscribe({
      next: (result: any) => {
        this.reportedProblems = result;
        this.sortProblemsByDate();
        this.setTourNames();
      }
    })
  }

  setTourNames(): void {
    this.reportedProblems.forEach(tp => {
      this.service.getTour(tp.tourId).subscribe({
        next: (result: Tour) => {
          tp.tourName = result.name
        }
      })
    });
  }

  sortProblemsByDate() {
    this.reportedProblems.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }

  messageForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  getRecipientId(tourProblem: TourProblem): Observable<number | undefined> {
    if (this.user.role === "tourist") {
      return this.service.getTour(Number(tourProblem.tourId)).pipe(
        map((result: Tour) => result.authorId),
        catchError(() => of(undefined))
      );
    } else {
      return of(tourProblem.touristId);
    }
  }

  markMessagesAsRead(tourProblem: TourProblem): void {
    tourProblem.messages.forEach(message => {
      if (message.recipientId === this.user.id) {
        message.isRead = true;
      }
    });
    this.updateProblem(tourProblem);
  }

  addMessage(tourProblem: TourProblem): void {
    if (this.messageForm.valid) {
      this.getRecipientId(tourProblem).subscribe((rId) => {
        if (rId !== undefined) {
          const message: Message = {
            senderId: this.user?.id,
            recipientId: rId,
            creationTime: new Date(),
            description: this.messageForm.value.description || "",
            senderName: this.user.username,
            isRead: false
          };
          tourProblem.messages.push(message);
          this.updateProblem(tourProblem);
          this.hubConnection
            .invoke('SendTourProblemMessageNotification', message.recipientId)
            .catch((err) => {
              console.error(err);
            });
        }
      });
    }
  }

  updateProblem(tourProblem: TourProblem) {
    this.service.updateProblem(tourProblem, this.user.role).subscribe({
      next: () => {
        this.messageForm.reset();
      }
    })
  }

  problemCategoryToString(category: TourProblemCategory | null): string {
    switch (category) {
      case 0:
        return 'Booking';
      case 1:
        return 'Itinerary';
      case 2:
        return 'Payment';
      case 3:
        return 'Transportation';
      case 4:
        return 'Guide services';
      default:
        return 'Other';
    }
  }

  problemPriorityToString(priority: TourProblemPriority | null): string {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      default:
        return 'High';
    }
  }
}