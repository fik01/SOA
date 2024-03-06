import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/shared/model/person.model';

@Component({
  selector: 'xp-my-followers',
  templateUrl: './my-followers.component.html',
  styleUrls: ['./my-followers.component.css']
})
export class MyFollowersComponent {
  followers: Person[];

  constructor(public dialogRef: MatDialogRef<MyFollowersComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {followers: Person[]}) {this.followers = data.followers}

  closeDialog(): void{
    this.dialogRef.close();
  }
}
