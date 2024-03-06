import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Equipment } from '../../administration/model/equipment.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-unused-equipment',
  templateUrl: './unused-equipment.component.html',
  styleUrls: ['./unused-equipment.component.css']
})
export class UnusedEquipmentComponent implements OnInit, OnChanges{

  @Output() equipmentMoved = new EventEmitter<null>()
  @Input() usedChanged: Equipment[]
  @Input() tour: Tour
  allEquipment: Equipment[] = [];
  usedEquipment: Equipment[] = [];
  unusedEquipment: Equipment[] = [];

  constructor(private service: TourAuthoringService) {}

  ngOnInit(): void {
    this.getEquipment()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unusedEquipment = []
    this.getTourEquipment()
  }

  moveToUsed(equipment: Equipment): void {
    let id = equipment.id!
    this.unusedEquipment.forEach(element => {
      if(element.id == id){
        let index = this.unusedEquipment.indexOf(element)
        this.unusedEquipment.slice(index, 1)
      }
    })
    this.tour.equipment.push(id)

    this.service.updateTour(this.tour).subscribe({
      next: () => {
        this.equipmentMoved.emit()
        this.getEquipment()
      },
      error: () => {}
    })
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
    this.allEquipment.forEach(element => {
      let id = element.id!
      if(this.tour.equipment.includes(id))
        this.usedEquipment.push(element)
      else
        this.unusedEquipment.push(element)
    })

    // this.allEquipment.forEach(element => {
    //   this.tour.equipment.forEach(id => {
    //     if(element.id == id && !this.usedEquipment.includes(element)){
    //       this.usedEquipment.push(element)
    //     }
    //     else if(!this.unusedEquipment.includes(element)) {
    //       this.unusedEquipment.push(element)
    //     }
    //   })
    // })
  }
}
