import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Equipment } from '../model/equipment.model';
import { EquipmentTracking } from '../model/equipmentTracking.model';
import { MarketplaceService } from '../marketplace.service'
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Person } from 'src/app/shared/model/person.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-equipment-tracking',
  templateUrl: './equipment-tracking.component.html',
  styleUrls: ['./equipment-tracking.component.css']
})
export class EquipmentTrackingComponent implements OnInit {

  allEquipment: Equipment[] = [];
  unusedEquipment: Equipment[] = [];
  usedEquipment: Equipment[] = [];
  equipmentTrackingToUpdate: EquipmentTracking = {
    id: NaN,
    touristId: NaN,
    neededEquipment: []
  };
  equipmentTracking: EquipmentTracking = {
    neededEquipment: []
  };
  userId = this.authService.user$.getValue().id;
 
  constructor(private service: MarketplaceService, private authService: AuthService, private dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
      this.getAllEquipment();
  }

  getAllEquipment(): void {
    this.service.getAllEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.allEquipment = result.results; 
        this.getUsedEquipment();
      },
      error: () => {
        console.log(console.error);
      }
    })
  }

  getUsedEquipment(): void{
    this.service.getEquipmentTrackingByTouristId().subscribe({
      next:(result : EquipmentTracking) => {
        if (!result) {
          this.createEquipmentTracking();
        } else {
          this.equipmentTrackingToUpdate.id = result.id;
          this.equipmentTrackingToUpdate.touristId = result.touristId;
          this.equipmentTrackingToUpdate.neededEquipment = result.neededEquipment;
        }
        this.sortAllEquipment();      
      },
      error: () => {
        console.log(console.error())
      }
    })
  }

  sortAllEquipment() : void {
    for (let el of this.allEquipment) {
      if(this.equipmentTrackingToUpdate.id && this.equipmentTrackingToUpdate.neededEquipment.includes(el.id || 0)){
        this.usedEquipment.push(el);
      } else {
        this.unusedEquipment.push(el);
      }     
    }
  }

  addEquipment(id : number, item : Equipment) : void{
    this.usedEquipment.push(item);
    const indexToRemove = this.unusedEquipment.findIndex(equipment => equipment.id === id);
    if (indexToRemove !== -1) {
      this.unusedEquipment.splice(indexToRemove, 1);
    }
    if(this.equipmentTrackingToUpdate.neededEquipment.includes(0)){
      this.equipmentTrackingToUpdate.neededEquipment[0] = id;
    } else {
      this.equipmentTrackingToUpdate.neededEquipment.push(id);
    }
    this.service.updateEquipmentTracking(this.equipmentTrackingToUpdate).subscribe({
      next:()=>{
        this.toastr.success('Equipment created','Success');
      },
      error: () => {
        this.toastr.error('There was an error while trying to create equipment','Error');
      }
    });
  }

  deleteEquipment(id : number, item : Equipment) : void{
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "equipment", title: item.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unusedEquipment.push(item);
        const indexToRemove = this.usedEquipment.findIndex(equipment => equipment.id === id);
        const indexToRemoveInUpdate = this.equipmentTrackingToUpdate.neededEquipment.findIndex(index => index === id);
        if(indexToRemove !== -1) {
          this.usedEquipment.splice(indexToRemove, 1);
          this.equipmentTrackingToUpdate.neededEquipment.splice(indexToRemoveInUpdate, 1);
        }
        this.service.updateEquipmentTracking(this.equipmentTrackingToUpdate).subscribe({
          next:()=>{
            this.toastr.success('Equipment deleted','Success');
          },
          error:()=>{
            this.toastr.error('There was an error while trying to delete equipment','Error');
          }
        });
      }
    })
  }

  createEquipmentTracking() : void{
    this.service.createEquipmentTracking(this.equipmentTracking).subscribe({
      next:(result : EquipmentTracking) => {
        this.equipmentTrackingToUpdate = result;
      },
      error: () => {
        console.log(console.error())
      }
    });
  }
}
