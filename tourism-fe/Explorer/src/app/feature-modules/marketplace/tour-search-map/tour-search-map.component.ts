import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';

@Component({
  selector: 'xp-tour-search-map',
  templateUrl: './tour-search-map.component.html',
  styleUrls: ['./tour-search-map.component.css']
})

export class TourSearchMapComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  private lat: number = 45.2396;
  private lon : number = 19.8227;
  radius: number = 100;

  constructor(private router:Router,public dialogRef: MatDialogRef<TourSearchMapComponent>) {
  }

  ngAfterViewInit(): void {
    this.drawCircle();
    this.initSearchMarker();
  }

  initSearchMarker(): void{
    const markerEvent = this.mapComponent.initSearchMarker(this.lat,this.lon);

    markerEvent.subscribe((coordinates: [number, number]) => {
      this.lat = coordinates[0];
      this.lon = coordinates[1];
      this.drawCircle();
    });
  }

  search(): void {
    const queryParams = {
      lat: this.lat,
      lon: this.lon,
      radius: this.radius
    };

    this.router.navigate(['/tours'],{queryParams});
    this.dialogRef.close("search");
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'km';
    }
    return '${value}m';
  }

  onSliderChange($event: any) {
    this.drawCircle();
  }

  drawCircle(){
    this.mapComponent.drawSearchCircle(this.lat,this.lon,this.radius);
  }

  cancel() {
    this.dialogRef.close();
  }
}
