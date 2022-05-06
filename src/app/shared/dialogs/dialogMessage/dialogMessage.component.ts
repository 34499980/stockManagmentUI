import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  title: string;
  text: string 
  
}
@Component({
  selector: 'app-dialogMessage',
  templateUrl: './dialogMessage.component.html',
  styleUrls: ['./dialogMessage.component.css']
})
export class DialogMessageComponent implements OnInit {
  _usuario: string
  _password: string
  _response: any = false
  _data : any
  _userService: UserService
  _dialogRef: MatDialogRef<DialogMessageComponent>
  constructor(dialogRef: MatDialogRef<DialogMessageComponent>,@Inject(MAT_DIALOG_DATA) data: DialogData) {
    this._dialogRef = dialogRef   
    this._data = data
   }

  ngOnInit(): void {
  }
 

}
