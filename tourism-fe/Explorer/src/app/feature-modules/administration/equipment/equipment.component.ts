import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Equipment } from '../model/equipment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentFormComponent } from '../equipment-form/equipment-form.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertDialogComponent } from 'src/app/shared/dialogs/delete-alert-dialog/delete-alert-dialog.component';


@Component({
  selector: 'xp-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipment: Equipment[] = [];
  selectedEquipment: Equipment;
  shouldRenderEquipmentForm: boolean = false;
  shouldEdit: boolean = false;
  
  constructor(private service: AdministrationService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEquipment();
  }
  
  deleteEquipment(equipment: Equipment): void {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: {operation: "delete", type: "equipment", title: equipment.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteEquipment(equipment.id!).subscribe({
          next: () => {
            this.toastr.success('Equipment deleted','Success');
            this.getEquipment();
          },
          error: () => {
            this.toastr.error('There was an error while deleting an equipment','Error');
          },
        })
      }
    })
  }

  getEquipment(): void {
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipment = result.results;
      },
      error: () => {
      }
    })
  }

  onEditClicked(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.shouldRenderEquipmentForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderEquipmentForm = true;
  }

  openForm(): void{
    const dialogRef = this.dialog.open(EquipmentFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.shouldEdit = false;
      this.getEquipment();
    });
  }

  updateForm(equipment: Equipment): void{
    const dialogRef = this.dialog.open(EquipmentFormComponent, {
      data: { equipment: equipment, shouldEdit: true }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.shouldEdit = false;
      this.getEquipment();
    });
  }
}
