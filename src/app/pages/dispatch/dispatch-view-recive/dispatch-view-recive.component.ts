import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { DispatchState } from 'src/app/enums/dispatch-state.enum';
import { Dispatch } from 'src/app/models/dispatch';
import { Stock } from 'src/app/models/stock';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DispatchService } from 'src/app/services/dispatch.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dispatch-view-recive',
  templateUrl: './dispatch-view-recive.component.html',
  styleUrls: ['./dispatch-view-recive.component.scss']
})
export class DispatchViewReciveComponent implements OnInit {
  formControl: FormGroup;
  dispatch: Dispatch;
  dataSource = new MatTableDataSource([]);
  checkOk = 'assets/ok_check.png';
  checkNotOk = 'assets/notok_check.png'
  showButton: Boolean;
  displayedColumns = [
    'CODE',
    'NAME',  
    'MODEL',
    'BRAND',
    'UNITY',   
    'ACTIONS',
    'CHECK'
    
];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authentication: AuthenticationService,
              private builder: FormBuilder,
              private toastService: ToastService,
              private translate: TranslateService,
              private dispatchService: DispatchService,
              private arquitectura: ArquitecturaService) { }

  ngOnInit(): void {    
    this.dispatch = this.activatedRoute.snapshot.data.dispatch as Dispatch;
    this.showButton = (this.dispatch.idDestiny === parseInt(this.authentication.getCurrentOffice(), 10) &&
    this.dispatch.idState != DispatchState.Finalized && this.dispatch.idState != DispatchState.Incomplete)
    this.dataSource.data = [...this.dispatch.stock];  
    this.formControl = this.builder.group({
      code: ['']
    });
    this.formControl.valueChanges.subscribe(val => {
      if (val.code?.length === 10){     
        this.addStock(val.code);
        this.formControl.reset();
      }
    })
  }
  help() {
    this.arquitectura.openDialogValidate().subscribe(res => {
      if(res){
        this.arquitectura.openDialogDispatch(this.dispatch).subscribe(res => {
          if (res) {
            this.dispatch = res;
            this.dispatchService.updateStock(this.dispatch).subscribe(() =>   
            this.dataSource.data = [...this.dispatch.stock]
            );
          }
        });
      }
    });
   
  }
  validateState(){
    return this.dispatch.idDestiny === parseInt(this.authentication.getCurrentOffice(), 10) &&
            this.dispatch.idState !== DispatchState.Finalized &&
            this.dispatch.idState !== DispatchState.Incomplete
  }
  canEdit(){
    return   this.dispatch.idDestiny === parseInt(this.authentication.getCurrentOffice(), 10);
  }
  addStock(code: string){
    const stock: Stock =  this.dataSource.data.find(x => x.code === code);
    if(stock) {
      if(stock.count < stock.unity)
      stock.count++;
    } else {
      this.toastService.error(this.translate.instant('DISPATCH.ACTIONS.NOTFOUND'))
    }
    
  }
  confirm(){
    this.dispatch.idState = DispatchState.Finalized;
    this.dispatchService.update(this.dispatch).subscribe(res => 
    {
      this.toastService.success(this.translate.instant('DISPATCH.ACTIONS.UPDATE'));
      this.router.navigate([AppRouting.DispatchList]);
      this.showButton = false;
    });
  }
  update(){
    this.dispatchService.update(this.dispatch).subscribe(() => 
      {
        this.toastService.success(this.translate.instant('DISPATCH.ACTIONS.UPDATE'));
        this.router.navigate([AppRouting.DispatchList]);
      });
  }
 removeStock(code: string){
    const stock: Stock =  this.dataSource.data.find(x => x.code === code);
    stock.count--;   
  }
  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }
  canConfirm() {
  return  this.dataSource.data.find(x => x.count != x.unity)
  }

}
