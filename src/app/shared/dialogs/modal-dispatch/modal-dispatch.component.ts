import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Dispatch } from 'src/app/models/dispatch';
import { DispatchService } from 'src/app/services/dispatch.service';

@Component({
  selector: 'app-modal-dispatch',
  templateUrl: './modal-dispatch.component.html',
  styleUrls: ['./modal-dispatch.component.css']
})
export class ModalDispatchComponent implements OnInit {
  dispatch: Dispatch
  dataSource = new MatTableDataSource([]);  
  displayedColumns = [
    'CODE',
    'NAME',  
    'MODEL',
    'BRAND',
    'UNITY',  
  
    
  ]
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dispatchService: DispatchService,
              public dialogRef: MatDialogRef<ModalDispatchComponent>) {
    this.dispatch = data.dispatch
   }

  ngOnInit(): void {
    this.dataSource.data = [...this.dispatch.stock];  
  }
  save() {
    this.dispatchService.updateStock(this.dispatch).subscribe(() => 
    this.dialogRef.close(this.dispatch)
    );
  
  }
  removeStock(code: string){
   const stock = this.dispatch.stock.find(x => x.code === code);
   if(stock.unity > 0) {
    stock.unity--;
    const dispatch_stock =  this.dispatch.dispatch_stock.find(x => x.idStock === stock.id);
    dispatch_stock.unity = stock.unity;
    if(dispatch_stock.unityRead > stock.unity){
      dispatch_stock.unityRead = stock.unity;
    }
  
   }
  }
  addStock(code: string){
    const stock = this.dispatch.stock.find(x => x.code === code);
     stock.unity++;
     const dispatch_stock =  this.dispatch.dispatch_stock.find(x => x.idStock === stock.id);
     dispatch_stock.unity = stock.unity;     
     dispatch_stock.unityRead = stock.unity;
     
   
    
  }

}
