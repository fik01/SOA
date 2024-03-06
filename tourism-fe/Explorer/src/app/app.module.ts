import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { AdministrationModule } from './feature-modules/administration/administration.module';
import { BlogModule } from './feature-modules/blog/blog.module';
import { MarketplaceModule } from './feature-modules/marketplace/marketplace.module';
import { TourAuthoringModule } from './feature-modules/tour-authoring/tour-authoring.module';
import { TourExecutionModule } from './feature-modules/tour-execution/tour-execution.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { CommonModule } from '@angular/common';
import { MapComponent } from './shared/map/map.component';
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MapViewModule } from './shared/map-view/map-view.module';
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteAlertDialogComponent } from './shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { RateAlertDialogComponent } from './shared/dialogs/rate-alert-dialog/rate-alert-dialog.component';
import { AddCoinsAlertDialogComponent } from './shared/dialogs/add-coins-alert-dialog/add-coins-alert-dialog.component';
import { TourRecommenationDialogComponent } from './shared/dialogs/tour-recommenation-dialog/tour-recommenation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteAlertDialogComponent,
    RateAlertDialogComponent,
    AddCoinsAlertDialogComponent,
    TourRecommenationDialogComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdministrationModule,
    BlogModule,
    MarketplaceModule,
    TourAuthoringModule,
    TourExecutionModule,
    AuthModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MapViewModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      extendedTimeOut:1000,
      maxOpened:3,
      positionClass:'toast-bottom-right',
      progressBar:true,
      progressAnimation:'increasing'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
