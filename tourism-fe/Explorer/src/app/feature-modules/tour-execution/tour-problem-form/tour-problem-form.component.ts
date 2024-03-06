import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourProblem, TourProblemCategory, TourProblemPriority } from '../../marketplace/model/tour-problem.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourExecutionService } from '../tour-execution.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-tour-problem-form',
  templateUrl: './tour-problem-form.component.html',
  styleUrls: ['./tour-problem-form.component.css']
})
export class TourProblemFormComponent {

  user = this.authService.user$.getValue();
  submittedFormValues: any = null;

  constructor(private service: TourExecutionService, private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TourProblemFormComponent>,private toastr: ToastrService) {
  }


  ngOnInit() {
  }

  tourProblemForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  reportProblem(): void {
    const tourProblem: TourProblem = {
      touristId: this.user.id,
      tourId: this.data.tourId, 
      category: this.stringToProblemCategory(this.tourProblemForm.value.category || ""),
      priority: this.stringToProblemPriority(this.tourProblemForm.value.priority || ""),
      description: this.tourProblemForm.value.description || "",
      time: new Date(),
      isSolved: false,
      touristUsername: this.user.username,
      authorUsername: "",
      messages: []
    };
    this.service.addProblem(tourProblem).subscribe({
      next: () => {
        //this.dialogRef.close(tourProblem);
        this.toastr.success('Problem reported','Success');
        this.dialogRef.close(tourProblem);
      },
      error: () =>{
        this.toastr.error('There was an error while trying to report a problem','Error');
      }
    });
  }

  closeForm(){
    this.dialogRef.close()
  }

  stringToProblemCategory(value: string): TourProblemCategory | null {
    switch (value) {
      case 'Booking':
        return 0;
      case 'Itinerary':
        return 1;
      case 'Payment':
        return 2;
      case 'Transportation':
        return 3;
      case 'Guide_Services':
        return 4;
      default:
        return 5;
    }
  }

  stringToProblemPriority(value: string): TourProblemPriority | null {
    switch (value) {
      case 'Low':
        return 0;
      case 'Medium':
        return 1;
      default:
        return 2;
    }
  }
}