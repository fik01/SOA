import { Component, OnInit } from '@angular/core';
import { TourRating } from '../model/tourrating.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-tourrating',
  templateUrl: './tourrating.component.html',
  styleUrls: ['./tourrating.component.css']
})
export class TourratingComponent implements OnInit{
  tourrating: TourRating[] = [];
  shouldRenderTourRatingForm: boolean = false;

  constructor(private service: MarketplaceService) { }

  ngOnInit(): void {
    this.getTourRating();
  }

  getTourRating(): void {
    this.service.getTourRating().subscribe({
      next: (result: PagedResults<TourRating>) => {
        this.tourrating = result.results;
      },
      error: () => {
      }
    })
  }

  onAddClicked(): void {
    this.shouldRenderTourRatingForm = true;
  }
}
