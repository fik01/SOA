import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';
import { LayoutService } from 'src/app/feature-modules/layout/layout.service';
import { UserNews } from 'src/app/feature-modules/layout/model/userNews';
import { ChangePassword } from './model/change-password.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>({username: "", id: 0, role: "" });

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
    private layoutService: LayoutService) { }

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
    .post<AuthenticationResponse>(environment.apiHost + 'users', registration);
  }

  logout(): void {
    this.router.navigate(['/home']).then(_ => {
      this.tokenStorage.clear();
      this.user$.next({username: "", id: 0, role: "" });
      this.layoutService.sendSignal();
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  customBase64Decode(input:string) {
    return decodeURIComponent(atob(input).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }


  customDecodeToken(token:string) {
    const jwtHelperService = new JwtHelperService();
    var decoded = this.customBase64Decode(token.split('.')[1]);


    var parsedToken = JSON.parse(String(decoded));

    // Convert specific fields to string if necessary
    if (parsedToken.hasOwnProperty('id')) {
      parsedToken.id = parsedToken.id.toString();
    }
    if (parsedToken.hasOwnProperty('role')) {
      parsedToken.role = parsedToken.role.toString();
    }

    if (parsedToken.hasOwnProperty('username')) {
      parsedToken.username = parsedToken.username.toString();
    }

    return parsedToken;
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || ""
    const decodedToken = this.customDecodeToken(accessToken)

    const user: User = {
      id: decodedToken.id,
      username: decodedToken.username,
      role: decodedToken.role,
    };
    // const userNews: UserNews = {
    //   id: 0,
    //   touristId: user.id,
    //   lastSendMs: 0,
    //   sendingPeriod: 0,
    // }
    // this.createUserNews(userNews);
    console.log(user)
    this.user$.next(user);
  }


  createUserNews(userNews: UserNews): Observable<UserNews> {
    return this.http.post<UserNews>(environment.apiHost + 'tourist/userNews', userNews);
  }


  requestPasswordChange(email: string): Observable<string> {
    const url = `${environment.apiHost}users/changePasswordRequest?email=${email}`;
    return this.http.post<string>(url, null);
  }

  changePassword(changePassword: ChangePassword): Observable<string>{
    return this.http.post<string>(environment.apiHost + 'users/changePassword', changePassword);
  }

  activateUser(token: string): Observable<AuthenticationResponse>{
    const url = `${environment.apiHost}users/activateUser?token=${token}`;
    return this.http.post<AuthenticationResponse>(url, null);
    /*.pipe(
      tap((authenticationResponse) => {
        this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
        this.setUser();
      })
    );*/

  }
}
