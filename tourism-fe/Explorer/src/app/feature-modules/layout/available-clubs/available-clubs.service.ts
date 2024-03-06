import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Club } from '../model/club.model';
import { Request } from '../model/request.model';
import {PagedResults} from "../../../shared/model/paged-results.model";
import {environment} from "../../../../env/environment";


@Injectable({
  providedIn: 'root'
})
export class AvailableClubsService {


    constructor(private http: HttpClient) { }

    getAvailableClubs(userId: number): Observable<Club[]> {
      return this.http.get<Club[]>('https://localhost:44333/api/tourist/request/joinClub/' + userId);
    }

    sendRequest(request: any): Observable<Request> {
      return this.http.post<any>('https://localhost:44333/api/tourist/request/', request);
    }


    


}