import { Component, OnInit } from '@angular/core';
import { Facility, FacilityCategory } from '../model/facility.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourAuthoringService } from '../tour-authoring.service';

@Component({
  selector: 'xp-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css'],
})
export class FacilityComponent implements OnInit {
  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.service.getFacilities().subscribe({
      next: (result: PagedResults<Facility>) => {
        this.facilities = result.results;
      },
    });
  }

  facilities: Facility[];
  categoriesSelected: boolean[] = [false, false, false, false];

  facilityCategoryToString(category: FacilityCategory): string {
    switch (category) {
      case FacilityCategory.Wc:
        return 'Wc';
      case FacilityCategory.Restaurant:
        return 'Restaurant';
      case FacilityCategory.Parking:
        return 'Parking';
      case FacilityCategory.Other:
        return 'Other';
      default:
        return '';
    }
  }
}
