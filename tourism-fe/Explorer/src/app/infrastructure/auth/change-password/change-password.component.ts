import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChangePassword } from '../model/change-password.model';

@Component({
  selector: 'xp-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required]),
  });
  fieldTextType: boolean;
  token: string;
  passwordChanged: boolean = false;
  submitted:boolean=false;
  samePassword:boolean=false;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      console.log(this.token);
    });
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  changePassword(){
    this.submitted=true;
    if(this.changePasswordForm.value.newPassword === this.changePasswordForm.value.newPasswordConfirm && this.changePasswordForm.valid){
      
      const changePassword: ChangePassword = {
        newPassword: this.changePasswordForm.value.newPassword!,
        newPasswordConfirm: this.changePasswordForm.value.newPasswordConfirm!,
        token: this.token
      }
      
      this.authService.changePassword(changePassword).subscribe({
        next: (response) => {
          this.passwordChanged = true;
        }
      })
    }
  }
  onInputChange(): void {
    this.samePassword=this.changePasswordForm.value.newPassword === this.changePasswordForm.value.newPasswordConfirm
  }
  backToLogin(){
    this.router.navigate(['/login']);
  }


}
