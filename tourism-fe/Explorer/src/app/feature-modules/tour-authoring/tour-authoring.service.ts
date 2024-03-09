import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from './model/tour.model';
import { Observable, map } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { Equipment } from '../administration/model/equipment.model';
import { PublicTourKeyPoints, TourKeyPoints } from './model/tour-keypoints.model';
import { Facility, PublicFacility } from './model/facility.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourRating } from '../marketplace/model/tourrating.model';
import { Session } from '../tour-execution/model/position-simulator.model';
import { TourStatistics } from './model/tour-statistics.model';
import { Sales } from './model/tour-discount-sale.model';
import { Campaign } from './model/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class TourAuthoringService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /*createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(
      environment.apiHost + 'tourManagement/tour',
      tour
    );
  }*/
  createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(
      'https://localhost:8080/newtour',
      tour
    );
  }

  getFeaturedTours():Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + 'tourist/tour'
    );
  }

  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + 'tourManagement/tour'
    );
  }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(
      environment.apiHost + 'tourManagement/equipment'
    );
  }

  getTourForTourist(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tourist/tour/' + id);
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tourManagement/tour/' + id);
  }

  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'tourManagement/tour/' + id);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(
      environment.apiHost + 'tourManagement/equipment/' + id
    );
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'tourManagement/tour/' + tour.id,
      tour
    );
  }

  archiveTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'tourManagement/tour/archive/' + tour.id, tour.authorId
    );
  }

  publishTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'tourManagement/tour/publish/' + tour.id, tour.authorId
    );
  }

  getTourKeyPointById(id: number): Observable<TourKeyPoints> {
    return this.http.get<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint/' + id
    );
  }

  getTourKeyPoints(): Observable<PagedResults<TourKeyPoints>> {
    return this.http.get<PagedResults<TourKeyPoints>>(
      environment.apiHost + 'tourKeyPoint'
    );
  }

  getTourKeyPointsByTourId(tourId: number): Observable<TourKeyPoints[]> {
    return this.http.get<TourKeyPoints[]>(
      environment.apiHost + 'tourKeyPoint/tour/' + tourId
    );
  }
  
  getFirstKeyPointByTourId(tourId: number): Observable<TourKeyPoints[]> {
    return this.http.get<TourKeyPoints[]>(
      environment.apiHost + 'tourist/tourKeyPoint/tour/' + tourId
    );
  }

  getRatingsByTourId(tourId: number): Observable<TourRating[]> {
    console.log(environment.apiHost + 'tourist/tourrating/tour/' + tourId);
    return this.http.get<TourRating[]>(
      environment.apiHost + 'tourist/tourrating/tour/' + tourId
    );
  }

  deleteTourKeyPoint(id: number): Observable<TourKeyPoints> {
    return this.http.delete<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint/' + id
    );
  }

  addTourKeyPoint(tourKeyPoint: TourKeyPoints): Observable<TourKeyPoints> {
    return this.http.post<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint',
      tourKeyPoint
    );
  }

  updateTourKeyPoint(tourKeyPoint: TourKeyPoints): Observable<TourKeyPoints> {
    return this.http.put<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint/' + tourKeyPoint.id,
      tourKeyPoint
    );
  }

  deleteEquipment(id: number): Observable<TourKeyPoints> {
    return this.http.delete<TourKeyPoints>(
      environment.apiHost + 'tourKeyPoint/' + id
    );
  }

  getFacilityById(facilityId: number): Observable<Facility> {
    return this.http.get<Facility>(
      environment.apiHost + 'author/facilities/' + facilityId
    );
  }

  updateFacility(facility: Facility): Observable<Facility> {
    return this.http.put<Facility>(
      environment.apiHost + 'author/facilities/' + facility.id,
      facility
    );
  }

  getFacilities(): Observable<PagedResults<Facility>> {
    const user = this.authService.user$.getValue();
    return this.http.get<PagedResults<Facility>>(
      environment.apiHost + user.role + '/facilities'
    );
  }

  createFacility(facility: Facility): Observable<Facility> {
    return this.http.post<Facility>(
      environment.apiHost + 'author/facilities',
      facility
    );
  }

  deleteFacility(facility: Facility): Observable<Facility> {
    return this.http.delete<Facility>(
      environment.apiHost + 'author/facilities/' + facility.id
    );
  }

  addPublicTourKeyPoint(publicTourKeyPoint: PublicTourKeyPoints): Observable<PublicTourKeyPoints> {
    return this.http.post<PublicTourKeyPoints>(environment.apiHost + 'tourKeyPoint/public', publicTourKeyPoint);
  }

  addPublicFacility(publicFacility: PublicFacility): Observable<PublicFacility> {
    return this.http.post<PublicFacility>(environment.apiHost + 'author/facilities/public', publicFacility);
  }
  
  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tourManagement/tour/' + id);
  }

  addTourRating(tourrating: TourRating): Observable<TourRating> {
    return this.http.post<TourRating>(
      environment.apiHost + 'tourist/tourrating', tourrating
    );
  }

  updateTourRating(tourrating: TourRating): Observable<TourRating> {
    return this.http.put<TourRating>(
      environment.apiHost + 'tourist/tourrating', tourrating
    );
  }

  getSesionByTourAndTouristId(tourId: number, touristId: number): Observable<Session> {
    return this.http.get<Session>(environment.apiHost + 'tourist/session/getByTourAndTouristId/' + tourId + '/' + touristId);
  }

  getValidForTouristComment(id: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'tourist/session/check/' + id);
  }

  getPublicTourKeyPointsForTourist(): Observable<PublicTourKeyPoints[]>{
    return this.http.get<PublicTourKeyPoints[]>(environment.apiHost + 'tourist/tourKeyPoint/public');
  }

  getPublicTourKeyPoints(): Observable<PublicTourKeyPoints[]>{
    return this.http.get<PublicTourKeyPoints[]>(environment.apiHost + 'tourKeyPoint/public/Approved');
  }

  getPublicFecilities(): Observable<PublicFacility[]>{
    return this.http.get<PublicFacility[]>(environment.apiHost + 'author/facilities/public/Approved');
  }

  getToursByAuthorId(id: number): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + 'tourManagement/tour/author?authorId=' + id
    );
  }

  getAttendanceStatistics(): Observable<TourStatistics[]>{
    return this.http.get<TourStatistics[]>(environment.apiHost + 'author/session/getAttendedStats')
  }  

  getAbandonedStatistics(): Observable<TourStatistics[]>{
    return this.http.get<TourStatistics[]>(environment.apiHost + 'author/session/getAbandonedStats')
  }

  getSoldToursStatistics(): Observable<TourStatistics[]>{
    return this.http.get<TourStatistics[]>(environment.apiHost + 'author/boughtItem/getMostSoldStats')
  }

  getSessionsByStatusForTourStatistics(tourId: number, sessionStatus: number): Observable<TourStatistics>{
    return this.http.get<TourStatistics>(environment.apiHost + 'author/session/getSessionsByStatusForTourStatistics/' + tourId + '/' + sessionStatus);
  }

  getPercentCompletedKeyPointOnTour(tourId:number, keyPointId:number): Observable<TourStatistics>{
    return this.http.get<TourStatistics>(environment.apiHost + 'author/session/getPercentCompletedKeyPointOnTour/' + tourId + '/' + keyPointId);
  }

  getNumberSessionByTour(tourId: number): Observable<TourStatistics>{
    return this.http.get<TourStatistics>(environment.apiHost + 'author/session/getNumberSessionsByTour/' + tourId);
  }

  getRatingsByTourIdForAuthor(tourId: number): Observable<TourRating[]> {
    return this.http.get<TourRating[]>(environment.apiHost + 'author/tourrating/tour/' + tourId);
  }

  getBestRatedStatistics(): Observable<TourStatistics[]>{
    return this.http.get<TourStatistics[]>(environment.apiHost + 'author/tourrating/getBestRatedStats')
  }

  saveSaleDiscount(salesData: Sales): Observable<any> {
    return this.http.post<any>(environment.apiHost + 'author/sales', salesData);
  }

  removeSaleDiscount(tourId: number): Observable<any> {
    return this.http.delete<any>(environment.apiHost + 'author/sales/' + tourId);
  }

  createTouristTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(
      environment.apiHost + 'touristTour',
      tour
    );
  }
  getTouristTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'touristTour/' + id);
  }
  updateTouristTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'touristTour/' + tour.id,
      tour
    );
  }

  deleteKeyPointsFromTouristTour(keyPointId: number){
    return this.http.delete<TourKeyPoints>(
      environment.apiHost + 'tourist/tourKeyPoint/' + keyPointId
    );
  }

  getKeypointsByPublicId(id : number): Observable<TourKeyPoints[]>{
    return this.http.get<TourKeyPoints[]>(
      environment.apiHost + 'tourist/tourKeyPoint/search/' + id
    );
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(environment.apiHost + 'tourist/tour/', campaign);
  }

  getRatingByTouristIdAndTourId(touristId: number, tourId: number): Observable<TourRating> {
    return this.http.get<TourRating>(environment.apiHost + 'tourist/tourrating/getByPersonIdAndTourId/' + touristId + "/" + tourId);
  }

  getNumberOfStartedToursByAuthorId(authorId: number): Observable<number>{
    return this.http.get<number>(environment.apiHost + 'author/session/getNumberOfStartedTours/' + authorId)
  }

  getNumberOfCompletedToursByAuthorId(authorId: number): Observable<number>{
    return this.http.get<number>(environment.apiHost + 'author/session/getNumberOfCompletedTours/' + authorId)
  }

  GetTourCompletionPercentageStats(authorId: number): Observable<number[]>{
    return this.http.get<number[]>(environment.apiHost + 'author/session/getTourCompletionPercentageStats/' + authorId)
  }
}
