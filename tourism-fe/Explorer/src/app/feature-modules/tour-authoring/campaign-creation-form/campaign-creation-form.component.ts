import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourAuthoringService } from '../tour-authoring.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Campaign } from '../model/campaign.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-campaign-creation-form',
  templateUrl: './campaign-creation-form.component.html',
  styleUrls: ['./campaign-creation-form.component.css']
})
export class CampaignCreationFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CampaignCreationFormComponent>,
    private authService: AuthService,
    private service: TourAuthoringService,
    private router: Router,
    private toastr: ToastrService  ) {}
  
  campaign: Campaign = {
    tours: [],
    name: '',
    description: '',
    touristId: 0
  }
  submitted:boolean=false;
  user: User | undefined;
  campaignForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  ngOnInit(): void{
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  createCampaign(): void {
    this.submitted=true
    this.campaign.tours = this.data.tours;
    this.campaign.name = this.campaignForm.value.name || '';
    this.campaign.description = this.campaignForm.value.description || '';
    this.campaign.touristId = this.user?.id || 0;
    if(this.campaignForm.valid)
    this.service.createCampaign(this.campaign).subscribe({
      next: (result: Campaign) => {
        this.router.navigate([`bought-tours`]);
        this.toastr.success('Campaign created','Success');
        this.dialogRef.close();
      },
      error: () =>{
        this.toastr.error('There was an error while trying to create a campaign','Error');
      }
    })
  }

  onCancelClick(): void {
    this.dialogRef.close(); 
  }

}
