import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserNews } from 'src/app/feature-modules/layout/model/userNews';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  fieldTextType: boolean;
  fieldTextTypeConfirm: boolean;
  userNews: UserNews;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  submitted: boolean = false;
  samePasswords:boolean=true;
  
 

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  register(): void {
    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
    };

    const confirmPassword = this.registrationForm.value.confirmPassword;
     const registrationFormValues = this.registrationForm.value;
    /*if (registrationFormValues.name === undefined || registrationFormValues.name === null || registrationFormValues.name === "") {
      this.nameFilled = false;
    } else {
      this.nameFilled = true;
    }
    
    if (registrationFormValues.surname === undefined || registrationFormValues.surname === null || registrationFormValues.surname === "") {
      this.surnameFilled = false;
    } else {
      this.surnameFilled = true;
    }
    
    if (registrationFormValues.email === undefined || registrationFormValues.email === null || registrationFormValues.email === "") {
      this.emailFilled = false;
    } else {
      this.emailFilled = true;
    }
    
    if (registrationFormValues.username === undefined || registrationFormValues.username === null || registrationFormValues.username === "") {
      this.usernameFilled = false;
    } else {
      this.usernameFilled = true;
    }
    
    if (registrationFormValues.password === undefined || registrationFormValues.password === null || registrationFormValues.password === "") {
      this.passwordFilled = false;
    } else {
      this.passwordFilled = true;
    }

    if (registrationFormValues.confirmPassword === undefined || registrationFormValues.confirmPassword === null || registrationFormValues.confirmPassword === "") {
      this.confirmPasswordFilled = false;
    } else {
      this.confirmPasswordFilled = true;
    }*/
    console.log(this.registrationForm.valid) 
    this.submitted=true
    if(registrationFormValues.password!==registrationFormValues.confirmPassword)
      this.samePasswords=false;
    else
      this.samePasswords=true;
    
    if (this.registrationForm.valid &&
        registration.password === confirmPassword) {
      this.authService.register(registration).subscribe({
        next: (result) => {
          // const user = this.authService.user$.getValue();

          
          const jwtHelperService = new JwtHelperService();
          const userId = +jwtHelperService.decodeToken(result.accessToken).id

          console.log("radis liiiiiiiiiiiiii")
          console.log(userId)
          const userNews = {
            id: 0,
            touristId: userId,
            lastSendMs: 0,
            sendingPeriod: 0,
          }
          this.authService.createUserNews(userNews).subscribe({
            next: (createdUserNews) => {
              console.log('User news created:', createdUserNews);
              this.router.navigate(['home']);
            },
            error: (error) => {
              console.error('Error creating user news:', error);
            },
          });
          this.router.navigate(['home']);
        },
      });
    }
  }
}
