import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { LayoutService } from 'src/app/feature-modules/layout/layout.service';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fieldTextType: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService
    ) { }
  
  submitted: boolean = false;
  usernameFilled=true;
  passFilled=true

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };
   /*  if(login.username===undefined || login.username===null || login.username==="")
      this.usernameFilled=false
    else
      this.usernameFilled=true;
    if(login.password===undefined || login.password===null || login.password==="")
      this.passFilled=false
    else 
      this.passFilled=true; */
      this.submitted=true
    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/home']);       
        
          this.layoutService.sendSignal();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
}
