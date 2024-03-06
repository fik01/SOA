import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.css']
})
export class ChangePasswordRequestComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  changePasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
  });

  isEmailSent: boolean = false;
  submitted:boolean=false;

  requestPasswordChange(){
    this.submitted=true;
    if(this.changePasswordForm.valid)
    {
        this.authService.requestPasswordChange(this.changePasswordForm.value.email!).subscribe({
        next: (response) => {
          console.log(response);
          this.isEmailSent = true;
        }
      })
    }
  }

  backToHome(){
    this.router.navigate(['/home']);
  }
}
