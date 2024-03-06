import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {ClubMember} from "../model/club-user/club-user.model";
import { environment} from "../../../../env/environment";

@Injectable({
  providedIn: 'root'
})
export class ClubKickService {

  constructor(private http: HttpClient) { }
  getClubMembers(ClubId: number,PageIndex: number): Observable<PagedResults<ClubMember>> {

    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({"clubId" : ClubId, "pageIndex" : PageIndex, "pageSize" : 5 });
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + 'tourist/request/members',{params:queryParams});
  }
  kickClubMember(ClubId: number,MemberId: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({"clubId" : ClubId, "userId": MemberId });
    return this.http.put<any>(environment.apiHost + 'tourist/request/kick?clubId=' + ClubId + '&userId=' + MemberId,{});
  }
}
