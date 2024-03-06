import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MaterialModule} from 'src/app/infrastructure/material/material.module';
import {RouterModule} from '@angular/router';
import {ClubInviteComponent} from './club-invite/club-invite.component';
import {ClubKickComponent} from './club-kick/club-kick.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserPendingReqComponent } from './user-pending-req/user-pending-req.component';
import { AvailableClubsComponent } from './available-clubs/available-clubs.component';
import { ClubComponent } from './club/club.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFollowersComponent } from './my-followers/my-followers.component';
import { MyFollowingsComponent } from './my-followings/my-followings.component';
import { MessagesComponent } from './messages/messages.component';
import {MatBadgeModule} from "@angular/material/badge";
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AboutUsTeamCardsComponent } from './about-us-team-cards/about-us-team-cards.component';
import { ATestSliderComponent } from './a-test-slider/a-test-slider.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FrequentQuestionsComponent } from './frequent-questions/frequent-questions.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TourRecommendationComponent } from './tour-recommendation/tour-recommendation.component';
import { NewClubDialogComponent } from './new-club-dialog/new-club-dialog.component';
import { ClubInfoComponent } from './club-info/club-info.component';

import { MapModule } from 'src/app/shared/map/map.module';

@NgModule({
    declarations: [
      HomeComponent,
      NavbarComponent,
      ClubInviteComponent,
      ClubKickComponent,
      UserPendingReqComponent,
      AvailableClubsComponent,
      ClubComponent,
      ClubFormComponent,
      UserProfilesComponent,
      FooterComponent,
      LandingPageComponent,
      MyProfileComponent,
      MyFollowersComponent,
      MyFollowingsComponent,
      MessagesComponent,
      ProfileComponent,
      AboutUsTeamCardsComponent,
      ATestSliderComponent,
      AboutUsComponent,
      FrequentQuestionsComponent,
      CarouselComponent,
      TourRecommendationComponent,
      NewClubDialogComponent,
      ClubInfoComponent,
    ],
    imports: [
      CommonModule,
      MaterialModule,
      RouterModule,
      MatListModule,
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatPaginatorModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      MatCardModule,
      MatDialogModule,
      BrowserModule,
      FormsModule,
      MatBadgeModule,
      MatMenuModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatSelectModule,
      FlexLayoutModule,
      MapModule
    ],
    exports: [
      NavbarComponent,
      HomeComponent,
      UserPendingReqComponent,
      ClubComponent,
      FooterComponent,
      LandingPageComponent,
      MessagesComponent,
      UserProfilesComponent,
      FooterComponent,
      LandingPageComponent,
      MyProfileComponent,
      MyFollowersComponent,
      MyFollowingsComponent,
      ProfileComponent,
      TourRecommendationComponent
    ]
})
export class LayoutModule {
}
