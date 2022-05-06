import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/models/user';
import { UserValidate } from 'src/app/models/userValidate.model';

@Component({
  selector: 'app-dialogValidate',
  templateUrl: './dialogValidate.component.html',
  styleUrls: ['./dialogValidate.component.css']
})
export class DialogValidateComponent implements OnInit {
 formControl: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private authentication: AuthenticationService,
              public dialogRef: MatDialogRef<DialogValidateComponent>,
              private formBuilder: FormBuilder
              ) { 
             
              }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onConfirm(){
    const user: UserValidate ={
      userName: this.formControl.controls.userName.value,
      password: this.formControl.controls.password.value
    }
    this.authentication.validate(user).subscribe(res => {
      if(res) {
        this.dialogRef.close(res);
      }
      this.dialogRef.close(res);
    });   
  }
  onDismiss(){
    this.dialogRef.close(false);
  }

}
