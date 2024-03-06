import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Request } from '../model/request.model';
import { UserRequest } from '../model/userRequest.model';
import {PagedResults} from "../../../shared/model/paged-results.model";
import {environment} from "../../../../env/environment";


@Injectable({
  providedIn: 'root'
})
export class UserPendingReqService {


    constructor(private http: HttpClient) { }

    getUserRequests(OwnerId: number): Observable<UserRequest[]> {
      return this.http.get<UserRequest[]>('https://localhost:44333/api/tourist/request/' + OwnerId);
    }

    updateRequest(request: Request): Observable<Request> {
      return this.http.put<Request>('https://localhost:44333/api/tourist/request/' + request.id, request);
    }

    getUsername(userId: number): Observable<string> {
      return this.http.get<string>(`https://localhost:44333/username/` + userId);
    }
    


}