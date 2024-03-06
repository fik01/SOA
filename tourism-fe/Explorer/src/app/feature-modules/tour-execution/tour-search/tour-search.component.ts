import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TourExecutionService } from '../tour-execution.service';
import { Tour } from '../model/tour-model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourDifficulty } from '../../tour-authoring/model/tour.model';
import { MatSelectChange } from '@angular/material/select';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css'],
})
export class TourSearchComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl(''),
    tag: new FormControl(''),
    difficulty: new FormControl(''),
    startPrice: new FormControl(),
    endPrice: new FormControl()
  });

  difficultyOptions: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];
  tagsForSearch: string[];
  searchedTours: Tour[];
  filteredTours: Tour[];
  myTours: Tour[];
  @Input() shownTours: Tour[];
  @Output() isClickedSearchChange = new EventEmitter<Tour[]>();

  constructor(private service: TourExecutionService){}

  ngOnInit(): void {
    this.searchForm.value.tag = "";
    this.searchForm.value.name = "";
    this.searchForm.value.difficulty = "";
    this.myTours = this.shownTours;
    this.tagsForSearch = [];
  }

  addTag(): void {
    if (this.searchForm.value.tag && !this.tagsForSearch.some(tag => tag.toLowerCase() === this.searchForm.value.tag?.toLowerCase())) {
      this.tagsForSearch.push(this.searchForm.value.tag);
    }
    this.searchForm.patchValue({tag: ""});
  }

  search(event: Event): void {
    event.stopPropagation();
    const name = this.searchForm.value.name || 'empty';
    const tags = this.tagsForSearch;
    if(this.tagsForSearch.length === 0) {
      tags[0]='empty';
    }

    this.service.searchTours(name, tags).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.searchedTours = this.crossSectionTours(result.results, this.myTours);
        this.searchedTours = this.filter(this.searchedTours);
        this.updateDisplayedTours(this.searchedTours);
      },
      error: () => {
        console.log(console.error());
      }
    });

    if(this.tagsForSearch[0] === 'empty') {
      this.tagsForSearch=[];
    }   
  }

  onDifficultySelected(event: MatSelectChange): void {
    this.searchForm.value.difficulty = event.value;
    this.searchForm.patchValue({ difficulty: event.value });
  }

  filter(tours: Tour[]): Tour[] {
    this.filteredTours = [];
    this.filterByDifficulty(tours);
    return this.filterByPrice(this.filteredTours); 
  }

  filterByDifficulty(tours: Tour[]): void{
    for (let tour of tours) {
      switch(this.searchForm.value.difficulty) {
        case 'Beginner':
          if(tour.difficulty === 0) {
           this.filteredTours.push(tour);
          } 
        break;
        case 'Intermediate':
          if(tour.difficulty === 1) {
           this.filteredTours.push(tour);
           } 
          break;
        case 'Advanced':
          if(tour.difficulty === 2) {
           this.filteredTours.push(tour);
          } 
          break;
        case 'Pro':
          if(tour.difficulty === 3 ) {
            this.filteredTours.push(tour);
          } 
          break;
        default:
          this.filteredTours = [];
          for(let tour of tours){
            this.filteredTours.push(tour);
          }
          break;
      }
     }
  }

  filterByPrice(tours: Tour[]): Tour[] {
    let filteredToursByPrice : Tour[] = []
    this.filteredTours.forEach(tour => {
      if(!this.searchForm.value.startPrice){
        this.searchForm.value.startPrice = 0;
      }

      if(!this.searchForm.value.endPrice){
        this.searchForm.value.endPrice = 10000;
      }

      if(this.IsInPriceRange(tour.price, this.searchForm.value.startPrice, this.searchForm.value.endPrice)){
        filteredToursByPrice.push(tour);
      }
    });
    return filteredToursByPrice;
  }

  IsInPriceRange(price: number, startPrice: number, endPrice: number): boolean {
    return startPrice <= price && price <= endPrice;
  }

  updateDisplayedTours(tours: Tour[]) {
    this.isClickedSearchChange.emit(tours);  
  }  

  crossSectionTours(tours: Tour[], shownTours: Tour[]): Tour[] {
    let crossSectionTours: Tour[] = [];
    
    shownTours.forEach(shownTour => {
      tours.forEach(tour => {
        if(tour.id === shownTour.id){
          crossSectionTours.push(tour);
        }
      });
    });

    return crossSectionTours;
  }

  public refresh(): void {
    this.tagsForSearch = [];
    this.searchForm.setValue({ name: '', tag: '', difficulty: '', startPrice: '', endPrice: ''});
  }

  removeTag(tag: string): void {
    const index = this.tagsForSearch.indexOf(tag);

    if (index >= 0) {
      this.tagsForSearch.splice(index, 1);
    }
  }
}
