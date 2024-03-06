import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ClubMember} from "../model/club-user/club-user.model";
import {Observable} from "rxjs";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {environment} from "../../../../env/environment";


@Injectable({
  providedIn: 'root'
})
export class ClubInviteService {

  constructor(private http: HttpClient) { }

  getInvitableUsers(ClubId:number,PageIndex: number): Observable<PagedResults<ClubMember>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({"clubId": ClubId,"pageIndex": PageIndex, "pageSize": 5})
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + 'tourist/request/invitableUsers',{params:queryParams});
  }

  inviteUser(ClubId: number,userId: number): Observable<any> {
    let data = {
      "Id": 0,
      "ClubId": ClubId,
      "UserId": userId,
      "RequestStatus": 'pending',
      "RequestDirection": true
    };

    return this.http.post<any>(environment.apiHost + 'tourist/request', data);
  }
}
