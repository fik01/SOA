import {Component, AfterViewInit, ChangeDetectorRef, Input, EventEmitter, Output} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";
import {Address, Coordinates, Elevation} from "../model/map.model";
import 'leaflet-routing-machine';
import { Facility, FacilityPointDto } from 'src/app/feature-modules/tour-authoring/model/facility.model';
import { MarkerDialogComponent } from 'src/app/shared/map/marker-dialog/marker-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TourKeyPointDto, TourKeyPoints } from 'src/app/feature-modules/tour-authoring/model/tour-keypoints.model';
import { KeyPointDetailsDialogComponent } from './key-point-details-dialog/key-point-details-dialog.component';
import { TourExecutionModule } from 'src/app/feature-modules/tour-execution/tour-execution.module';
import { TourAuthoringService } from 'src/app/feature-modules/tour-authoring/tour-authoring.service';
import { TourKeypointUpdateFormComponent } from 'src/app/feature-modules/tour-authoring/tour-keypoint-update-form/tour-keypoint-update-form.component';
import { Session } from 'src/app/feature-modules/tour-execution/model/position-simulator.model';
import { Challenge } from 'src/app/feature-modules/administration/model/challenge.model';
import { ChallengeDetailsDialogComponent } from './challenge-details-dialog/challenge-details-dialog.component';
import { Title } from 'chart.js';
@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  private map: L.Map;
  private markers: L.Marker[] = [];
  routingControl: L.Routing.Control;
  public clickStatus:number =0;
  private lastMarker:L.Marker;
  private newFacility: FacilityPointDto = {latitude: 0, longitude: 0};
  private markersToRemove:L.Marker[]=[];
  private newKeyPoint: TourKeyPointDto = {latitude: 0, longitude: 0};
  private routeDistanceInMeters: number = 0;
  private routeDurationInSeconds: number = 0;
  private searchCircle: L.Circle;
  private touristIcon: L.Icon;
  private challengeLocationIcon : L.Icon;
  private challengeSocialIcon : L.Icon;
  private challengeMiscIcon : L.Icon;
  private touristPositionMarker: L.Marker;
  

  @Input() mapId: string;
  @Input('latitude') initialLatitude: number = 45.2396;
  @Input('longitude') initialLongitude: number = 19.8227;
  @Input('zoom') initialZoom: number = 13;
  @Output() removeKeyPoint: EventEmitter<{ name: string; latitude: number, longitude:  number}> = new EventEmitter<{ name: string; latitude: number, longitude:  number }>();

  getLastMarker(){
    return this.lastMarker;
  }

  getMarkers():L.Marker[]{
    return this.markers;
  }

  setStatus():void{
    this.clickStatus=1;
    this.cdr.detectChanges();
  }

  constructor(private mapService:MapService,private cdr: ChangeDetectorRef,public dialog: MatDialog, private tourAuthoringService: TourAuthoringService ) {

  }

  ngAfterViewInit() {
    this.initMarkerIcon();
    this.initMap(this.initialLatitude, this.initialLongitude, this.initialZoom);
    this.initTouristIcon();
    this.initChallengeIcons();
  }

  openDialog(facility:Facility,marker:L.Marker): void {
    const dialogRef = this.dialog.open(MarkerDialogComponent, {
      data: facility,
      width: '30%',
      height: '60%'
    });
    dialogRef.componentInstance.deleteClicked.subscribe(() => {
      this.map.removeLayer(marker);
      window.location.reload();
    });
  }

  openKeyPointDetails(keyPoint: TourKeyPoints, marker: L.Marker): void {
    const dialogRef = this.dialog.open(KeyPointDetailsDialogComponent, {
      data: keyPoint,
      width: '200px',
      height: '350px'
    });
    dialogRef.componentInstance.deleteClicked.subscribe((dataTourId: number) => {
      this.clearMarkers();
      this.tourAuthoringService.getTourKeyPointsByTourId(dataTourId).subscribe({
        next:(result: TourKeyPoints[])=>{
          const keypoints = result;
          this.initKeyPointsRoute(keypoints);
        }
      });
      console.log(marker);
    });
  }

  removeFacilities():void{
    if(this.markersToRemove.length===0)return;
    this.markersToRemove.forEach((marker: L.Marker) => {
      marker?.removeFrom(this.map);
    });
    this.markersToRemove = [];
  }

  initFacility(facility:Facility):void{
    let customIcon = L.icon({
      iconUrl: facility.image,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41]
    });

    let marker=L.marker([facility.latitude, facility.longitude], { icon: customIcon }).addTo(this.map);
    this.markersToRemove.push(marker);
    marker.on('click', () => {
      this.openDialog(facility,marker);
    });

    var zoomThreshold = 12;

    this.map.on('zoomend',  () => {
      if(this.markersToRemove.includes(marker)){
        if (this.map.getZoom() >= zoomThreshold) {

          marker.addTo(this.map); // Show the marker
        } else {
          this.map.removeLayer(marker); // Hide the marker
        }
      }
    });
  }

  initChallenge(challenge: Challenge) {
    if(challenge.type == 0){
      let marker = L.marker([challenge.latitude, challenge.longitude], {icon:this.challengeSocialIcon}).addTo(this.map);
      this.markersToRemove.push(marker);
      marker.on('click', () => {
        this.openChallengeDialog(challenge);
      });
    }
    else if(challenge.type == 1){
      let marker = L.marker([challenge.latitude, challenge.longitude], {icon:this.challengeLocationIcon}).addTo(this.map);
      this.markersToRemove.push(marker);
      marker.on('click', () => {
        this.openChallengeDialog(challenge);
      });

    }else if(challenge.type == 2){
      let marker = L.marker([challenge.latitude, challenge.longitude], {icon:this.challengeMiscIcon}).addTo(this.map);
      this.markersToRemove.push(marker);
      marker.on('click', () => {
        this.openChallengeDialog(challenge);
      });
    }
  }
  initChallengeIcons() :void{
    this.challengeLocationIcon = L.icon({
      iconUrl: "../../../assets/images/location-challengeMarker.png", 
      iconSize: [46, 46], // Set the size of your custom marker
      iconAnchor: [23, 46], // Adjust the anchor point if needed
      popupAnchor: [0, -46]  // Adjust the popup anchor if you have popups
    });
    this.challengeSocialIcon = L.icon({
      iconUrl: "../../../assets/images/social-challengeMarker.png", 
      iconSize: [46, 46], 
      iconAnchor: [23, 46], 
      popupAnchor: [0, -46] 
    });
    this.challengeMiscIcon = L.icon({
      iconUrl: "../../../assets/images/misc-challengeMarker.png", 
      iconSize: [46, 46], 
      iconAnchor: [23, 46], 
      popupAnchor: [0, -46] 
    });
  }

  registerTouristIconOnClick(): void {
    this.map.on('dblclick', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      if(this.clickStatus==1){
        this.clearMarkers();
      }
      this.addTouristMarker(lat,lng);
    });
  }

  openChallengeDialog(challenge: Challenge) {
    const dialogRef = this.dialog.open(ChallengeDetailsDialogComponent, {
      data: challenge,
      width: '200px',
      height: '350px'
    });
  }

  initFacilityMarker(url:string,lat:number,lon:number): FacilityPointDto{
    let customIcon = L.icon({
      iconUrl: url,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41]
    });
    let marker=L.marker([lat, lon], { icon: customIcon, draggable: true }).addTo(this.map);

    marker.on('dragend', (event) => {
      const newLatLng = event.target.getLatLng();
      console.log(event.target.getLatLng());
      console.log(this.newFacility);
      this.newFacility.latitude = newLatLng.lat;
      console.log(this.newFacility.latitude);
      this.newFacility.longitude = newLatLng.lng;
      console.log(this.newFacility.longitude);
    });

    marker.addTo(this.map);

    console.log(this.newFacility);
    return this.newFacility;
  }

  initKeyPointMarker(lat: number, lng: number): TourKeyPointDto {
    const marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    marker.on('dragend', (event) => {
      const newLatLng = event.target.getLatLng();
      console.log(event.target.getLatLng());
      console.log(this.newKeyPoint);
      this.newKeyPoint.latitude = newLatLng.lat;
      console.log(this.newKeyPoint.latitude);
      this.newKeyPoint.longitude = newLatLng.lng;
      console.log(this.newKeyPoint.longitude);
    });

    marker.addTo(this.map);

    return this.newKeyPoint;
  }

  setView(latitude: number, longitude: number, zoom: number) {
    this.map.panTo(L.latLng(latitude, longitude), {animate: true, duration: 1.0, easeLinearity: 0.25});
    setTimeout(() => {
      this.map.setZoom(zoom, {animate: true});
    }, 1000);
  }

  private initMap(latitude: number, longitude: number, zoom: number): void {
    this.map = L.map(this.mapId, {
      center: [latitude, longitude],
      zoom: zoom,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.map.doubleClickZoom.disable();
  }

  private initMarkerIcon(): void{
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41]
    });
  }

  registerOnClick(): void {
    this.map.on('dblclick', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      if(this.clickStatus==1){
        this.clearMarkers();
      }
      this.addMarker(lat,lng);
    });
  }

  registerOneMarkerOnClick(): void {
    this.map.on('dblclick', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      if(this.clickStatus==1){
        this.clearMarkers();
      }
      this.addOneMarker(lat,lng);
    });
  }

  addMarker(lat: number, lng: number): void {
    const marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    this.lastMarker=marker;

    let markerNum = this.markers.length+1;
    marker.bindPopup(markerNum.toString());
    this.markers.push(marker);
  }

  addKeyPointMarker(keypoint: TourKeyPoints): void {
    const marker = L.marker([keypoint.latitude, keypoint.longitude], { draggable: false }).addTo(this.map);
    marker.setZIndexOffset(10000);
    this.lastMarker=marker;
    const popupContent = `
    <div>
      <img src="${keypoint.image}" alt="Key Point Image" style="max-width: 100%; height: auto;">
      <h1>${keypoint.name}</h1>
      <button id="removeKeyPointButton">Remove keypoint</button>
    </div>
    `;

    marker.on('popupopen', () => {
      const button = document.getElementById('removeKeyPointButton');
      if (button) {
        button.addEventListener('click', () => {
          this.removeKeyPointMarker(marker, keypoint);
        });
      }
    });
    const popupOptions = { minWidth: 200 };

    marker.bindPopup(popupContent, popupOptions);
    this.markers.push(marker);
  }

  initTouristKeyPointsRoute(keypoints: TourKeyPoints[], vehicleType: string = 'walking') {
    keypoints.forEach((point)=>{
      this.addKeyPointMarker(point);
    })

    this.setRoute(vehicleType);
  }


  removeKeyPointMarker(marker: L.Marker, keypoint: TourKeyPoints): void {
    // Find the index of the marker in the markers array
    const markerIndex = this.markers.indexOf(marker);
  
    if (markerIndex !== -1) {
      // Remove the marker from the markers array
      this.markers.splice(markerIndex, 1);
  
      // Remove the marker from the map
      this.map.removeLayer(marker);
  
      // Update the route
      this.setRoute();
  
      this.removeKeyPoint.emit({name: keypoint.name, latitude: keypoint.latitude, longitude: keypoint.longitude});
    } else {
      console.error("Marker not found in the markers array");
    }
  }

  initTouristIcon(): void{
    this.touristIcon = L.icon({
      iconUrl: "../../../assets/images/touristMarker.png", 
      iconSize: [46, 46], // Set the size of your custom marker
      iconAnchor: [23, 46], // Adjust the anchor point if needed
      popupAnchor: [0, -46] // Adjust the popup anchor if you have popups
  });
  }

  addOneMarker(lat: number, lng: number): void {
    if (this.lastMarker) {
      this.lastMarker.setLatLng([lat, lng]);
    } else {
      const marker = L.marker([lat, lng], { draggable: true, icon: this.touristIcon }).addTo(this.map);
      let markerNum = this.markers.length + 1;
      marker.bindPopup(markerNum.toString());
      this.markers.push(marker);
      this.lastMarker = marker;
    }
  }

  addTouristMarker(lat: number, lng: number): void {
    const marker = L.marker([lat, lng], { draggable: true, icon: this.touristIcon, autoPan: true, zIndexOffset: 100000 }).addTo(this.map);
    marker.bindPopup('Drag marker to set location').openPopup();

    this.lastMarker=marker;

    this.touristPositionMarker = marker;
  }

  initKeyPoint(keypoint: TourKeyPoints) {
    const marker = L.marker([keypoint.latitude, keypoint.longitude], { draggable: false }).addTo(this.map);

    marker.setZIndexOffset(10000);

    this.lastMarker=marker;

    let markerNum = this.markers.length+1;
    marker.bindPopup(markerNum.toString());
    this.markers.push(marker);

    marker.on('click', () => {
      this.openKeyPointDetails(keypoint, marker);
    });    
  }

  initKeyPointsRoute(keypoints: TourKeyPoints[], vehicleType: string = 'walking') {
    keypoints.forEach((point)=>{
      this.initKeyPoint(point);
    })

    this.setRoute(vehicleType);
  }

  clearMarkers(): void{
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
    this.markers.forEach((marker: L.Marker) => {
      marker?.removeFrom(this.map);
    });
    this.markers = [];
  }

  setRoute(vehicleType: string = 'walking'): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = L.Routing.control({
      waypoints: this.getWaypoints(),
      show: false,
      lineOptions: {
        addWaypoints: false,
      } as L.Routing.LineOptions,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiYm9zaGtvNDIwIiwiYSI6ImNsbno0Y2xnZDEwenQyaXFtbWhoNGw3djEifQ.QgZuryjcj1pb-hGXF0ueRg',
        { profile: 'mapbox/' + vehicleType }
      ),
    }).addTo(this.map);

    this.routingControl.on('routesfound', (e) => {
      var routes = e.routes;
      var summary = routes[0].summary;
      this.routeDistanceInMeters = summary.totalDistance;
      this.routeDurationInSeconds = summary.totalTime;
    })
  }

  setRouteTourist(vehicleType: string = 'walking'): void{
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
  
    this.routingControl = L.Routing.control({
      waypoints: [], // Set waypoints to an empty array
      show: false,
      router: L.routing.mapbox('pk.eyJ1IjoiYm9zaGtvNDIwIiwiYSI6ImNsbno0Y2xnZDEwenQyaXFtbWhoNGw3djEifQ.QgZuryjcj1pb-hGXF0ueRg', {profile: 'mapbox/'+vehicleType})
    }).addTo(this.map);
  
    // Add your waypoints later when you want to display them
    this.routingControl.setWaypoints(this.getWaypoints());
  
    this.routingControl.on('routesfound', (e) => {
      var routes = e.routes;
      var summary = routes[0].summary;
      this.routeDistanceInMeters = summary.totalDistance;
      this.routeDurationInSeconds = summary.totalTime;
    })
  }

  
  removeRoute(): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
  }

  getRouteDistanceInMeters(): number {
    return this.routeDistanceInMeters;
  }

  getRouteDurationInSeconds(): number {
    return this.routeDurationInSeconds;
  }

  getWaypoints(): L.LatLng[]{
    return this.markers.map((marker) => marker.getLatLng());
  }

  updateRoute(): void{
    this.routingControl.setWaypoints(this.getWaypoints());
  }

  search(address: string): void {
    this.mapService.search(address).subscribe({
      next: (coordinates: Coordinates[]) => {
        console.log(coordinates);
        //Lat and lon info
      },
      error: () => {},
    });
  }

  reverseSearch(lat: number,lon: number): void {
    this.mapService.reverseSearch(lat,lon).subscribe({
      next: (address: Address) => {
        console.log(address);
        console.log(address.address.city_district);
        //address info
      },
      error: () => {},
    });
  }

  elevation(coordinates:Coordinates[]): void {
    this.mapService.getElevation(coordinates).subscribe({
      next: (elevation: Elevation[]) => {
        console.log(elevation);
        //elevation data
      },
        error: () => {},
    });
  }

  drawSearchCircle(lat: number, lon: number, radius: number):void
  {
    if(this.searchCircle) this.searchCircle.removeFrom(this.map);
    this.searchCircle = L.circle([lat,lon],radius).addTo(this.map);
  }

  initSearchMarker(lat: number, lon: number) : EventEmitter<[number, number]>
  {
    const markerPositionChanged: EventEmitter<[number, number]> = new EventEmitter();
    const marker = L.marker([lat, lon], { draggable: true }).addTo(this.map);

    this.map.on('dblclick', (e: any) => {
      marker.setLatLng([e.latlng.lat,e.latlng.lng]);
      markerPositionChanged.emit([e.latlng.lat,e.latlng.lng]);
    });

    marker.on('dragend', (e: any) => {
      const latlng = e.target.getLatLng();
      markerPositionChanged.emit([latlng.lat,latlng.lng]);
    });

    return markerPositionChanged;
  }

  getDistance(firstLat: number, fisrtLng: number, secondLat: number, secondLng: number): number {
    return this.map.distance(L.latLng(firstLat, fisrtLng), L.latLng(secondLat, secondLng));
  }

  getTouristMarker() {
    return this.touristPositionMarker;
  }

  addTouristKeyPointMarker(keypoint: TourKeyPoints, activeSessionExists: boolean, isTourist: boolean): void {
    const marker = L.marker([keypoint.latitude, keypoint.longitude], { draggable: false }).addTo(this.map);
    if (keypoint.positionInTour == 0 && !activeSessionExists) {
      if (isTourist) {
        marker
          .bindPopup(
            `<div>
        <h1 style="text-align: center;">Start</h1>
        <h3>Arrive within 100m to activate tour<h3>
        </div>`
          )
          .openPopup();
      }
      else {
        marker
          .bindPopup(
            `<div>
        <h1 style="text-align: center;">Start</h1>
        </div>`
          )
          .openPopup();
      }
    }

    marker.setZIndexOffset(10000);
    this.lastMarker=marker;
    let popupContent;
    if (isTourist) {
      popupContent = `
      <div>
        <img src="${keypoint.image}" alt="Key Point Image" style="max-width: 100%; height: auto;">
        <h1>${keypoint.name}</h1>
        <h2>Secret: hidden</h2>
      </div>
      `;
    }
    else {
      popupContent = `
      <div>
        <img src="${keypoint.image}" alt="Key Point Image" style="max-width: 100%; height: auto;">
        <h1>${keypoint.name}</h1>
        <h2>Secret: ${keypoint.secret}</h2>
      </div>
      `;
    }

    const popupOptions = { minWidth: 200 };

    marker.bindPopup(popupContent, popupOptions);
    this.markers.push(marker);
  }

  getCenter(): L.LatLng {
    return this.map.getCenter();
  }

  closePopups(): void {
    this.map.closePopup();
  }

  getDistanceBetweenPoints(firstLat: number, firstLng: number, secondLat: number, secondLng: number, vehicleType: string = 'walking'): void {
    const map = L.map(this.mapId + 1, {
      center: [0, 0],
      zoom: 10,
    });
    const tiles = L.tileLayer(
      'https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(map);

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(firstLat, firstLng), L.latLng(secondLat, secondLng)],
      show: false,
      lineOptions: {
        addWaypoints: false,
      } as L.Routing.LineOptions,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiYm9zaGtvNDIwIiwiYSI6ImNsbno0Y2xnZDEwenQyaXFtbWhoNGw3djEifQ.QgZuryjcj1pb-hGXF0ueRg',
        { profile: 'mapbox/' + vehicleType }
      ),
    }).addTo(map);

    routingControl.on('routesfound', (e) => {
      var routes = e.routes;
      var summary = routes[0].summary;
      this.routeDistanceInMeters = summary.totalDistance;
      this.routeDurationInSeconds = summary.totalTime;
      console.log(this.routeDistanceInMeters)
    })
  }

  revealSecret(keyPoint: TourKeyPoints) {
    const popupContent = `
    <div>
      <img src="${keyPoint.image}" alt="Key Point Image" style="max-width: 100%; height: auto;">
      <h1>${keyPoint.name}</h1>
      <h2>Secret: ${keyPoint.secret}</h2>
    </div>
    `;

    const popupOptions = { minWidth: 200 };
    this.markers.find(m => m.getLatLng().lat == keyPoint.latitude && m.getLatLng().lng == keyPoint.longitude)?.bindPopup(popupContent, popupOptions);
  }
}
