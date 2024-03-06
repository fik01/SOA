import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipment } from '../model/equipment.model';
import { AdministrationService } from '../administration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnChanges {

  @Output() equimpentUpdated = new EventEmitter<null>();
  @Input() equipment: Equipment;
  @Input() shouldEdit: boolean = false;

  constructor(private service: AdministrationService,
    private dialogRef: MatDialogRef<EquipmentFormComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.equipment = data.equipment;
        this.shouldEdit = data.shouldEdit;
        this.equipmentForm.patchValue({
          "name": this.equipment.name,
          "description": this.equipment.description
        });
      }
  }

  ngOnChanges(): void {
    this.equipmentForm.reset();
    if(this.shouldEdit) {
      this.equipmentForm.patchValue(this.equipment);
    }
  }

  equipmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  addEquipment(): void {
    const equipment: Equipment = {
      name: this.equipmentForm.value.name || "",
      description: this.equipmentForm.value.description || "",
    };
    this.service.addEquipment(equipment).subscribe({
      next: () => { this.equimpentUpdated.emit();
        this.dialogRef.close(); }
    });
  }

updateEquipment(): void {
  const equipment: Equipment = {
    name: this.equipmentForm.value.name || "",
    description: this.equipmentForm.value.description || "",
  };
  equipment.id = this.equipment.id;

  this.service.updateEquipment(equipment).subscribe({
    next: () => { 
      this.toastr.success('Equipment added','Success');
      this.equimpentUpdated.emit();
      this.dialogRef.close();
    },
    error: () => {
      this.toastr.error('There was an error while adding an equipment','Error');
    },
  });
}


  onCancelClick(): void {
    this.dialogRef.close(); 
}
}
