import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordRequestComponent } from './change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
