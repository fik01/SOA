import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/shared/model/person.model';

@Component({
  selector: 'xp-my-followings',
  templateUrl: './my-followings.component.html',
  styleUrls: ['./my-followings.component.css']
})
export class MyFollowingsComponent {
  followers: Person[];

  constructor(public dialogRef: MatDialogRef<MyFollowingsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {followers: Person[]}) {this.followers = data.followers}

  closeDialog(): void{
    this.dialogRef.close();
  }
}
