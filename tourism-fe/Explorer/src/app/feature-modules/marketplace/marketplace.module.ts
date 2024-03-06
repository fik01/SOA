import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPreferencesComponent } from './tour-preferences/tour-preferences.component';
import { TourPreferencesFormComponent } from './tour-preferences-form/tour-preferences-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { TourratingComponent } from './tourrating/tourrating.component';
import { TourratingFormComponent } from './tourrating-form/tourrating-form.component';
import { ReportedProblemsComponent } from './reported-problems/reported-problems.component';
import {MapModule} from "../../shared/map/map.module";
import {MatSliderModule} from "@angular/material/slider";
//import { MatSelectModule } from '@angular/material/select';
import { EquipmentTrackingComponent } from './equipment-tracking/equipment-tracking.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CartItemsComponent } from './shopping-cart/cart-items/cart-items.component';
import { BundleCreateUpdateComponent } from './bundle-create-update/bundle-create-update.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BundleViewComponent } from './bundle-view/bundle-view.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { TourSearchMapComponent } from './tour-search-map/tour-search-map.component';

@NgModule({
  declarations: [
    TourPreferencesComponent,
    TourPreferencesFormComponent,
    TourratingComponent,
    TourratingFormComponent,
    ReportedProblemsComponent,
    EquipmentTrackingComponent,
    TourSearchMapComponent,
    CartItemsComponent,
    BundleCreateUpdateComponent,
    BundleViewComponent,
    CouponManagementComponent,
    CouponFormComponent,
    CouponDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    TagInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MapModule,
    MatSliderModule,
    DragDropModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports:[
    TourPreferencesComponent,
    TourPreferencesFormComponent,
    TourratingComponent,
    TourratingFormComponent,
    ReportedProblemsComponent,
    EquipmentTrackingComponent,
  ]
})
export class MarketplaceModule { }
