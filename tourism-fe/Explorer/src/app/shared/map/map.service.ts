import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address, Coordinates, Elevation} from "../model/map.model";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  search(street: string): Observable<Coordinates[]> {
    return this.http.get<Coordinates[]>(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<Address> {
    return this.http.get<Address>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  getElevation(coordinates:Coordinates[]): Observable<Elevation[]> {
    let preppedCoordinates : string = "";
    coordinates.forEach(function (coordinate:Coordinates){
      preppedCoordinates += `${coordinate.lat},${coordinate.lon}|`;
    } );
    preppedCoordinates = preppedCoordinates.slice(0,-1);

    return this.http.get<Elevation[]>(`https://api.open-elevation.com/api/v1/lookup?locations=${preppedCoordinates}`)
  }
}
