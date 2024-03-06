import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tour } from "src/app/feature-modules/tour-authoring/model/tour.model";
import { environment } from "src/env/environment";
import { PagedResults } from "../model/paged-results.model";
import { TourKeyPoints } from "src/app/feature-modules/tour-authoring/model/tour-keypoints.model";
import { PositionSimulator, Session } from "src/app/feature-modules/tour-execution/model/position-simulator.model";
import { TourRating } from "src/app/feature-modules/marketplace/model/tourrating.model";
import { Person } from "../model/person.model";
import { Challenge } from "src/app/feature-modules/administration/model/challenge.model";
import { ChallengeExecution } from "src/app/feature-modules/tour-execution/model/challenge-execution.model";
import { UserExpirience } from "src/app/feature-modules/layout/model/userExperience";

@Injectable({
    providedIn: 'root'
  })
export class MapViewService {

    constructor(private http: HttpClient) { }

    getBoughtToursByTouristId(touristId: number): Observable<PagedResults<Tour>> {
        return this.http.get<PagedResults<Tour>>(environment.apiHost + 'tourist/shoppingcart/boughtTours/' + touristId);
    }

    getPositionSimulatorByTouristId(touristId: number): Observable<PositionSimulator> {
        return this.http.get<PositionSimulator>(environment.apiHost + 'tourist/positionSimulator/touristId/' + touristId);
    }

    updatePositionSimulator(positionSimulator: PositionSimulator): Observable<PositionSimulator> {
        return this.http.put<PositionSimulator>(environment.apiHost + 'tourist/positionSimulator/' + positionSimulator.id, positionSimulator);
    }

    createPositionSimulator(positionSimulator: PositionSimulator): Observable<PositionSimulator> {
        return this.http.post<PositionSimulator>(environment.apiHost + 'tourist/positionSimulator', positionSimulator);
    }

    createSession(session: Session): Observable<Session> {
        return this.http.post<Session>(environment.apiHost + 'tourist/session', session);
    }
    
    getActiveSessionByTouristId(id: number): Observable<Session>{
        return this.http.get<Session>(environment.apiHost + 'tourist/session/geActiveSessiontByTouristId/' + id);
    }

    updateSession(session: Session): Observable<Session> {
        return this.http.put<Session>(environment.apiHost + 'tourist/session', session);
    }

    completeKeyPoint(sessionId: number, keyPointId: number): Observable<Session>{
        return this.http.put<Session>(environment.apiHost + 'tourist/session/completeKeyPoint/' + sessionId + '/' + keyPointId, null);
    }

    getSessionsByTouristId(touristId: number): Observable<PagedResults<Session>> {
        return this.http.get<PagedResults<Session>>(environment.apiHost + 'tourist/session/getSessionsByTouristId/' + touristId);
    }

    update(data: Person, userId: number, role: string): Observable<Person>{
        return this.http.put<Person>(environment.apiHost + role + "/person/" + userId, data);
    }

    getUserProfile(id: number, role: string): Observable<Person>{
        return this.http.get<Person>(environment.apiHost + role + "/person/" + id);
    }

    getChallenges(): Observable<PagedResults<Challenge>> {
        return this.http.get<PagedResults<Challenge>>(environment.apiHost + 'tourist/challenge');
    }

    getChallengeExecutionForTourist(touristId: number): Observable<PagedResults<ChallengeExecution>>{
        return this.http.get<PagedResults<ChallengeExecution>>(environment.apiHost + 'tourist/challengeExecution/' + touristId);
    }

    addChallengeExecution(challengeExecution: ChallengeExecution): Observable<ChallengeExecution>{
        return this.http.post<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution' ,challengeExecution);
    }

    deleteChallengeExecution(id: number): Observable<ChallengeExecution> {
        return this.http.delete<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution/' + id);
    }

    addXPSocial(idchallenge:number,xp:number):Observable<UserExpirience> {
        return this.http.put<UserExpirience>(environment.apiHost + 'tourist/userExperience/addxpsocial/' + idchallenge +'/'+xp,null);
    }

    updateChallengeExecution(challengeExecution: ChallengeExecution, id: number): Observable<ChallengeExecution>{
        return this.http.put<ChallengeExecution>(environment.apiHost + 'tourist/challengeExecution/' + id ,challengeExecution);
    }

    addXP(id:number,xp:number):Observable<UserExpirience> {
        return this.http.put<UserExpirience>(environment.apiHost + 'tourist/userExperience/addxp/' + id +'/'+xp,null);
    }
}