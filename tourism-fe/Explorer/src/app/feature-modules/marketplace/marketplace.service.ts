import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TourPreferences } from './model/tour-preferences.model'; 
import { environment } from 'src/env/environment';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourProblem } from './model/tour-problem.model';
import { Tour } from './model/tour.model';
import { Equipment } from './model/equipment.model';
import { EquipmentTracking } from './model/equipmentTracking.model';
import { TourRating } from './model/tourrating.model';
import { Bundle } from './model/bundle.model';
import { PaymentRecord } from './model/payment-record.model';
import { Coupon } from './model/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }


  getReportedProblems(userId: number,role:string){
    if(role === "tourist")
      return this.http.get<TourProblem>(environment.apiHost + 'tourist/tourProblem/' + userId);
    else
     return this.http.get<TourProblem>(environment.apiHost + 'author/tourProblem/' + userId);
  }

  updateProblem(tourProblem: TourProblem,role:string): Observable<TourProblem> {
    if(role === "tourist")
      return this.http.put<TourProblem>(environment.apiHost + 'tourist/tourProblem/' + tourProblem.id, tourProblem);
    else
      return this.http.put<TourProblem>(environment.apiHost + 'author/tourProblem/' + tourProblem.id, tourProblem);
  }

  getPreference(): Observable<TourPreferences>{
    return this.http.get<TourPreferences>(environment.apiHost + 'tourist/tourPreferences');
  }

  createPreferences(preferences : TourPreferences): Observable<TourPreferences>{
    return this.http.post<TourPreferences>(environment.apiHost + 'tourist/tourPreferences', preferences);
  }

  deletePreference(id : number): Observable<TourPreferences>{
    return this.http.delete<TourPreferences>(environment.apiHost + 'tourist/tourPreferences/' + id);
  }

  getAllEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'tourist/equipmentTracking/allEquipment');
  }
  
  getEquipmentTrackingByTouristId(): Observable<EquipmentTracking> {
    return this.http.get<EquipmentTracking>(environment.apiHost + 'tourist/equipmentTracking/myEquipment');
  }

  createEquipmentTracking(equipmentTracking : EquipmentTracking): Observable<EquipmentTracking>{
    return this.http.post<EquipmentTracking>(environment.apiHost + 'tourist/equipmentTracking', equipmentTracking);
  }

  updateEquipmentTracking(equipmentTracking: EquipmentTracking): Observable<EquipmentTracking> {
    return this.http.put<EquipmentTracking>(environment.apiHost + 'tourist/equipmentTracking', equipmentTracking);
  }
  
  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tourist/tour/' + id);
  }

  getTourRating(): Observable<PagedResults<TourRating>> {
    return this.http.get<PagedResults<TourRating>>(environment.apiHost + 'tourist/tourrating')
  }

  addTourRating(tourrating: TourRating): Observable<TourRating> {
    return this.http.post<TourRating>(environment.apiHost + 'tourist/tourrating', tourrating);
  }

  getToursByAuthorId(id: number): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost + 'tourManagement/tour/author?authorId=' + id
    );
  }

  createBundle(bundle:Bundle):Observable<Bundle>{
    return this.http.post<Bundle>(environment.apiHost+'author/bundle',bundle);
  }

  getAllBundles(): Observable<PagedResults<Bundle>> {
    return this.http.get<PagedResults<Bundle>>(environment.apiHost + 'author/bundle');
  }

  getBundlesByAuthorId(authorId: number): Observable<PagedResults<Bundle>> {
    return this.http.get<PagedResults<Bundle>>(environment.apiHost + 'author/bundle/authorBundles/' + authorId);
  }

  deleteBundle(id: number): Observable<Bundle>{
    return this.http.delete<Bundle>(environment.apiHost + 'author/bundle/'+id);
  }

  getBundleById(id: number): Observable<Bundle>{
    return this.http.get<Bundle>(environment.apiHost + 'author/bundle/'+id);
  }

  updateBundle(bundle: Bundle): Observable<Bundle>{
    return this.http.put<Bundle>(environment.apiHost+'author/bundle',bundle);
  }

  archiveBundle(bundle: Bundle): Observable<Bundle> {
    return this.http.put<Bundle>(environment.apiHost + 'author/bundle/archiveBundle', bundle);
  }

  publishBundle(bundle: Bundle): Observable<Bundle> {
    return this.http.put<Bundle>(environment.apiHost+'author/bundle',bundle);
  }

  createPaymentRecord(paymentRecord: PaymentRecord): Observable<PaymentRecord>{
    return this.http.post<PaymentRecord>(environment.apiHost + 'tourist/paymentRecord', paymentRecord);
  }

  getAllPaymentRecords(): Observable<PagedResults<PaymentRecord>>{
    return this.http.get<PagedResults<PaymentRecord>>(environment.apiHost + 'tourist/paymentRecord')
  }
    
  getCouponsByAuthorId(id: number): Observable<PagedResults<Coupon>> {
    return this.http.get<PagedResults<Coupon>>(environment.apiHost + 'author/coupon?authorId=' + id);
  }

  createCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(environment.apiHost + 'author/coupon', coupon);
  }

  deleteCoupon(id: number): Observable<Coupon> {
    return this.http.delete<Coupon>(environment.apiHost + 'author/coupon/' + id);
  }

  updateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(environment.apiHost + 'author/coupon/' + coupon.id, coupon);
  }
}