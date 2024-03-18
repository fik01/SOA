import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Equipment } from '../../administration/model/equipment.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../model/tour.model';


@Component({
  selector: 'xp-equipment-selection',
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements OnInit, OnChanges {

  @Input() tour: Tour;
  allEquipment: Equipment[] = [];
  usedEquipment: Equipment[] = [];
  unusedEquipment: Equipment[] = [];
  shouldRenderUnusedEquipment: boolean = false
  displayIcon: string = 'add'

  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.getEquipment()
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getEquipment(): void {
    this.allEquipment = []
    this.usedEquipment = []
    this.unusedEquipment = []
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.allEquipment = result.results
        this.getTourEquipment()
      },
      error: () => {
      }
    })
  }

  getTourEquipment(): void {
    if (this.tour.equipment != null) {
    this.allEquipment.forEach(element => {
      this.tour.equipment.forEach(id => {
        if(element.id == id && !this.usedEquipment.includes(element)){
          this.usedEquipment.push(element)
        }
        else if (!this.unusedEquipment.includes(element)){
          this.unusedEquipment.push(element)
        }
      })
    })
    }
  }


  onAddClicked(): void {
    this.shouldRenderUnusedEquipment = !this.shouldRenderUnusedEquipment
    if(this.shouldRenderUnusedEquipment)
      this.displayIcon = 'clear'
    else
      this.displayIcon = 'add'
  }

  moveToUnused(equipment: Equipment): void {
    this.tour.equipment.forEach(id => {
      if(id == equipment.id){
        const index1 = this.tour.equipment.indexOf(id)
        if (index1 > -1){
          this.tour.equipment.splice(index1, 1)
        }
      }
    })
    this.service.updateTour(this.tour).subscribe({
      next: () => {
        this.getEquipment()
      },
      error: () => {}
    })
  }

}
