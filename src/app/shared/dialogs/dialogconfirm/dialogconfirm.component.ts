import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogconfirm',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.css']
})
export class DialogconfirmComponent implements OnInit {
 title: string;
 message: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<DialogconfirmComponent>
              ) { 
                this.title = data.title;
                this.message = data.message;
              }

  ngOnInit(): void {
  }
  onConfirm(){
    this.dialogRef.close(true);
  }
  onDismiss(){
    this.dialogRef.close(false);
  }

}
