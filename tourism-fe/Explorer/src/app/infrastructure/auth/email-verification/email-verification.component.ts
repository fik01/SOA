import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'xp-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  token: string;
  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      this.authService.activateUser(this.token).subscribe({
        next: (response) => {
          // const accessToken = response.accessToken;
          // console.log('Access Token:', accessToken);

          // const decodedToken: any = jwtDecode(accessToken);
          // console.log('Decoded Token:', decodedToken);

          // const userInfo = decodedToken.yourUserProperty; // Replace 'yourUserProperty' with the actual property name in the token
          // console.log('User Information:', userInfo);
          console.log(response);
        }
      })
    });
  }


  toLogin(){
    this.router.navigate(['/login']);
  }
}
