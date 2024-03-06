import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { PositionSimulator, Session } from './model/position-simulator.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourKeyPoints } from '../tour-authoring/model/tour-keypoints.model';
import { Tour } from './model/tour-model';
import { TourRating } from '../marketplace/model/tourrating.model';
import { Club } from '../layout/model/club.model';
import { Challenge } from '../administration/model/challenge.model';
import { ChallengeExecution } from './model/challenge-execution.model';
import { UserExpirience } from '../layout/model/userExperience';
import { TourProblem } from '../marketplace/model/tour-problem.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getPreviousLocation(userId: number): Observable<Session> {
    return this.http.get<Session>(environment.apiHost + 'tourist/session/' + userId);
  }
  
  createSession(positionSimulator: Session): Observable<Session> {
    return this.http.post<Session>(environment.apiHost + 'tourist/session', positionSimulator);
  }

  updatePosition(positionSimulator: Session): Observable<Session> {
    return this.http.put<Session>(environment.apiHost + 'tourist/session', positionSimulator);
  }

  getActiveSessionByTouristId(id: number): Observable<Session>{
    return this.http.get<Session>(environment.apiHost + 'tourist/session/geActiveSessiontByTouristId/' + id);
  }

  getTours(): Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'tourist/tour')
  }

  getTourKeyPointsByTourId(tourId?: number): Observable<TourKeyPoints[]> {
    return this.http.get<TourKeyPoints[]>(environment.apiHost + 'tourist/tourKeyPoint/tour/' + tourId);
  }

  getPurchasedTours(userId: number):  Observable<Tour[]> {
    const url = `https://localhost:44333/api/tourist/shoppingcart?userId=${userId}`;
    return this.http.get<Tour[]>(url);
  }

  getUsedTours(userId: number) : Observable<Tour[]> {
   return this.http.get<Tour[]>('https://localhost:44333/api/tourist/shoppingcart/' + userId)
  }

  updateBoughtTour(userId: number, tourId: number): Observable<any> {
    const url = `https://localhost:44333/api/tourist/shoppingcart/${userId}/${tourId}`;
    return this.http.post<any>(url, null)
  }

  completeKeyPoint(sessionId: number, keyPointId: number): Observable<Session>{
    return this.http.put<Session>(environment.apiHost + 'tourist/session/completeKeyPoint/' + sessionId + '/' + keyPointId, null);
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tourist/tour/' + id);
  }
  getValidForTouristComment(id: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'tourist/session/check/' + id);
  }

  addTourRating(tourrating: TourRating): Observable<TourRating> {
    return this.http.post<TourRating>(environment.apiHost + 'tourist/tourrating', tourrating);
  }
  getRatingsByTourId(tourId: number): Observable<TourRating[]> {
    return this.http.get<TourRating[]>(environment.apiHost + 'tourist/tourrating/tour/' + tourId);
  }
  searchTours(name : string, tags : string[]): Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'tourist/tour/search/' + name + '/' + tags );
  }  

  getChallenges(): Observable<PagedResults<Challenge>> {
    return this.http.get<PagedResults<Challenge>>(environment.apiHost + 'tourist/challenge');
  }

  addExecutionChallenge(challengeExecution: ChallengeExecution): Observable<ChallengeExecution>{
    return this.http.post<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution' ,challengeExecution);
  }

  getExecutionChallenges(): Observable<PagedResults<ChallengeExecution>>{
    return this.http.get<PagedResults<ChallengeExecution>>(environment.apiHost + 'tourist/challengeExecution');
  }

  updateExecutionChallenge(challengeExecution: ChallengeExecution, id: number): Observable<ChallengeExecution>{
    return this.http.put<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution/' + id ,challengeExecution);
  }

  getExecutionChallengesForTourist(touristId: number): Observable<PagedResults<ChallengeExecution>>{
    return this.http.get<PagedResults<ChallengeExecution>>(environment.apiHost + 'tourist/challengeExecution/' + touristId);
  }
  getTouristTours(id: number):Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + 'touristTour/tourist?authorId=' + id
    );
  }
  
  addXP(id:number,xp:number):Observable<UserExpirience>
  {
    return this.http.put<UserExpirience>(environment.apiHost + 'tourist/userExperience/addxp/' + id +'/'+xp,null);
  }
  addXPSocial(idchallenge:number,xp:number):Observable<UserExpirience>
  {
    return this.http.put<UserExpirience>(environment.apiHost + 'tourist/userExperience/addxpsocial/' + idchallenge +'/'+xp,null);
  }

  deleteExecutionChallenge(id: number): Observable<ChallengeExecution> {
    return this.http.delete<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution/' + id);
  }

  getChallengesForTour(tour: Tour): Observable<PagedResults<Challenge>> {
    return this.http.post<PagedResults<Challenge>>(environment.apiHost + 'tourist/challenge/tour', tour);
  }

  getPositionSimulatorByTouristId(touristId: number): Observable<PositionSimulator> {
    return this.http.get<PositionSimulator>(environment.apiHost + 'tourist/positionSimulator/touristId/' + touristId);
  }
  
  getRecommendedTours(userId : number) : Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'tourist/tour/recommended/'+userId);
  }

  addProblem(tourProblem: TourProblem): Observable<TourProblem> {
    return this.http.post<TourProblem>(environment.apiHost + 'tourist/tourProblem', tourProblem);
  }

  getActiveTours(userId : number) : Observable<PagedResults<Tour>>{
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'tourist/tour/active/'+userId);
  }
}
