import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { TourProblem } from './model/tour-problem.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { UserInformation } from './model/user_information.model';
import { User } from './model/user.model';
import { ApplicationRating } from './model/application-rating.model';
import { PublicTourKeyPoints, TourKeyPoints } from '../tour-authoring/model/tour-keypoints.model';
import { PublicFacility } from '../tour-authoring/model/facility.model';
import { Challenge } from './model/challenge.model';
import {Wallet} from "../marketplace/model/wallet.model";

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) { }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(
      environment.apiHost + 'administration/equipment'
    );
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(
      environment.apiHost + 'administration/equipment/' + id
    );
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(
      environment.apiHost + 'administration/equipment',
      equipment
    );
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(
      environment.apiHost + 'administration/equipment/' + equipment.id,
      equipment
    );
  }
  getApplicationRatings(
    role: string
  ): Observable<PagedResults<ApplicationRating>> {
    return this.http.get<PagedResults<ApplicationRating>>(
      environment.apiHost + role + '/applicationrating'
    );
  }
  addApplicationRating(
    applicationRating: ApplicationRating,
    role: string
  ): Observable<ApplicationRating> {
    return this.http.post<ApplicationRating>(
      environment.apiHost + role + '/applicationrating',
      applicationRating
    );
  }
  deleteApplicationRating(
    applicationRating: ApplicationRating,
    role: string
  ): Observable<ApplicationRating> {
    return this.http.delete<ApplicationRating>(
      environment.apiHost + role + '/applicationrating/' + applicationRating.id
    );
  }

  getTourProblems(): Observable<PagedResults<TourProblem>> {
    return this.http.get<PagedResults<TourProblem>>(environment.apiHost + 'administrator/tourProblem')
  }

  getUserInformation(): Observable<PagedResults<UserInformation>> {
    return this.http.get<PagedResults<UserInformation>>(environment.apiHost + 'administration/userInformation')
  }
  blockUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'administration/userInformation', user)
  }

  getPendingKeypoints(): Observable<Array<PublicTourKeyPoints>> {
    return this.http.get<Array<PublicTourKeyPoints>>(environment.apiHost + 'administration/tourKeyPoint/public/2')
  }

  getPendingFacilities(): Observable<PagedResults<PublicFacility>> {
    return this.http.get<PagedResults<PublicFacility>>(environment.apiHost + 'administration/facilities/public')
  }

  changePublicKeypointStatus(keyPointId: number, status: string): Observable<PublicTourKeyPoints> {
    return this.http.put<PublicTourKeyPoints>(environment.apiHost + 'administration/tourKeyPoint/public/' + keyPointId + '/' + status, keyPointId)
  }

  changePublicFacilityStatus(facilityId: number, status: string): Observable<PublicFacility> {
    return this.http.put<PublicFacility>(environment.apiHost + 'administration/facilities/public/' + facilityId + '/' + status, facilityId)
  }
  giveDeadline(tp: TourProblem): Observable<TourProblem> {
    return this.http.put<TourProblem>(environment.apiHost + 'administrator/tourProblem', tp)
  }
  punishAuthor(tp:TourProblem):Observable<TourProblem>{
    return this.http.put<TourProblem>(environment.apiHost + 'administrator/tourProblem/'+tp.id!, tp)
  }

  getChallenges(): Observable<PagedResults<Challenge>> {
    return this.http.get<PagedResults<Challenge>>(
      environment.apiHost + 'administrator/challenge'
    );
  }

  deleteChallenge(id: number): Observable<Challenge> {
    return this.http.delete<Challenge>(
      environment.apiHost + 'administrator/challenge/' + id
    );
  }

  addChallenge(role: String,challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(
      environment.apiHost + role + '/challenge',
      challenge
    );
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.put<Challenge>(
      environment.apiHost + 'administrator/challenge/' + challenge.id,
      challenge
    );
  }

  addCoins(userId: number,coins: number): Observable<Wallet> {
    return this.http.put<Wallet>(
      environment.apiHost + `administration/userInformation/addToBalance?userId=${userId}&coins=${coins}`,
      null
    );
  }

  getTourKeyPointById(id: number): Observable<TourKeyPoints> {
    return this.http.get<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint/' + id
    );
  }
}
