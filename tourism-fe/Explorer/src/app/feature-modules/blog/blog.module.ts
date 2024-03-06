import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCreateComponent } from './blog-create/blog-create.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BlogsOverviewComponent } from './blogs-overview/blogs-overview.component';
import { BlogPageOverviewComponent } from './blog-page-overview/blog-page-overview.component';
import { MapModule } from 'src/app/shared/map/map.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    BlogCreateComponent,
    BlogsOverviewComponent,
    BlogPageOverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MapModule,
    MatExpansionModule
  ],
  exports:[
    BlogCreateComponent
  ]
})
export class BlogModule { }
