import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicTourKeyPoints } from '../../tour-authoring/model/tour-keypoints.model';
import { AdministrationService } from '../administration.service';
import {
  Facility,
  PublicFacility,
} from '../../tour-authoring/model/facility.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatDialog } from '@angular/material/dialog';
import { RequestDenialCommentComponent } from '../request-denial-comment/request-denial-comment.component';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/env/environment';

@Component({
  selector: 'xp-public-keypoint-facility-requests',
  templateUrl: './public-keypoint-facility-requests.component.html',
  styleUrls: ['./public-keypoint-facility-requests.component.css'],
})
export class PublicKeypointFacilityRequestsComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  pendingKeyPoints: PublicTourKeyPoints[] = [];
  pendingFacilities: PublicFacility[] = [];
  private hubConnection: signalR.HubConnection;

  constructor(
    private service: AdministrationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pendingFacilities = [];
    this.pendingKeyPoints = [];
    this.getPendingKeyPoints();
    this.getPendingFacilities();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketHost, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection.start().catch((err) => {
      console.error(err);
    });
  }

  getPendingKeyPoints(): void {
    this.service.getPendingKeypoints().subscribe({
      next: (result: Array<PublicTourKeyPoints>) => {
        this.pendingKeyPoints = result;
      },
    });
  }

  getPendingFacilities(): void {
    this.service.getPendingFacilities().subscribe({
      next: (result: PagedResults<PublicFacility>) => {
        result.results.forEach((facility) => {
          if (facility.status == 'Pending') {
            this.pendingFacilities.push(facility);
          }
        });
      },
    });
  }

  approveKeypointRequest(keypoint: PublicTourKeyPoints) {
    this.service
      .changePublicKeypointStatus(keypoint.id!, 'Approved')
      .subscribe({
        next: (result: PublicTourKeyPoints) => {
          this.hubConnection
            .invoke('SendPublicKeyPointNotification', keypoint.name, 'Approved', keypoint.creatorId)
            .catch((err) => {
              console.error(err);
            });
          this.ngOnInit();
        },
      });
  }

  denyKeypointRequest(keypoint: PublicTourKeyPoints, type: string) {
    const dialogRef = this.dialog.open(RequestDenialCommentComponent, {
      width: '20%',
      height: '46%',
      data: { id: keypoint.id, type: type, keypoint: keypoint },
    });
  }

  approveFacilityRequest(facility: PublicFacility) {
    this.service.changePublicFacilityStatus(facility.id, 'Approved').subscribe({
      next: (result: PublicFacility) => {
        this.hubConnection
          .invoke('SendPublicFacilityNotification', facility.name, 'Approved', facility.creatorId)
          .catch((err) => {
            console.error(err);
          });
        this.ngOnInit();
      },
    });
  }

  denyFacilityRequest(facility: PublicFacility, type: string) {
    const dialogRef = this.dialog.open(RequestDenialCommentComponent, {
      width: '20%',
      height: '46%',
      data: { id: facility.id, type: type, facility: facility },
    });
  }

  showMarkerLocation(latitude: number, longitude: number) {
    this.mapComponent.clearMarkers();
    this.mapComponent.addMarker(latitude, longitude);
  }
}
