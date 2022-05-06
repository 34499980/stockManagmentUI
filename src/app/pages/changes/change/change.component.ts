import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { SaleState } from 'src/app/enums/sale-state.enum';
import { CalculateChanges, Changes } from 'src/app/models/changes.model';
import { Item } from 'src/app/models/item.model';
import { PaymentType } from 'src/app/models/paymentType.model';
import { Sale_stock } from 'src/app/models/sale-stock.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ChangesService } from 'src/app/services/changes.service';
import { SaleService } from 'src/app/services/sale.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangesComponent implements OnInit {
  formControl: FormGroup;
  sale: Sale = {
    idOffice: parseInt(this.authenticationService.getCurrentOffice(), 10),
    idUser: parseInt(this.authenticationService.getCurrentId(), 10),
    amount: 0,
    dateProces: undefined,
    id: 0,
    idState: SaleState.Initiated,
    refer: undefined,
    sale_stock: [],
    stock: [],
    stock_office: [],
    paymentType: undefined
  };
  changes: Changes = {
    idOffice: parseInt(this.authenticationService.getCurrentOffice(), 10),
    idUser: parseInt(this.authenticationService.getCurrentId(), 10),
    amount: 0,
    dateProces: undefined,
    id: 0,
    idState: SaleState.Initiated,
    refer: undefined,
    stock: []
  }
  calculateChanges: CalculateChanges = {
    changes: undefined,
    sale: undefined
  }
  paymentType: PaymentType;
  dataSource = new MatTableDataSource([]);
 
  showButton: Boolean;
  editable: boolean;
  
  @Output() uploadSale: EventEmitter<CalculateChanges> = new EventEmitter<CalculateChanges>();
  @Output() uploadSale2: EventEmitter<CalculateChanges> = new EventEmitter<CalculateChanges>();
  // @Output() uploadPaymentType: EventEmitter<PaymentType> = new EventEmitter<PaymentType>();
  @ViewChild('cdkStepper') cdkStepper: MatStepper
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private builder: FormBuilder,
    private toastService: ToastService,
    private translate: TranslateService,
    private saleService: SaleService,
    private stockService: StockService,
    private changesService: ChangesService,
    private authenticationService: AuthenticationService,
    private arquitectura: ArquitecturaService) { }

  ngOnInit(): void {
    this.editable = true;
    // this.sendToChild();

  }
  ngAfterViewInit(): void {
   
  }
  cancel() {
    
  }
  generateChanges(changes: Changes) {    
      this.changes = changes;
      this.calculateChanges = {
        changes: this.changes,
        sale: this.sale
      }
      this.sendToChild();
  }
  updateSale(sale: Sale) {
    if (sale == null) {
      this.back();
    } else {
      this.sale = sale;
      
      this.calculateChanges = {
        changes: this.changes,
        sale: this.sale
      };
      this.sendToChildTwo();
    } 

  }
  paymentTypeSelectedParent(selected: PaymentType) {
    if (selected == null) {
      this.back();
    } else {   
      this.editable = false;   
      this.sale.paymentType = selected;
      this.fillStockUnitys(this.changes.stock);
      this.calculateChanges = {
        changes: this.changes,
        sale: this.sale
      };
      this.changesService.GenerateChanges(this.calculateChanges).subscribe(() => {
        this.toastService.success(
          this.translate.instant('CHANGES.MESSAGES.SUCCESS')
        );
      });
      //Generar los cambios en api
      this.next();
    }

  }
  fillStockUnitys(array: Stock[]){
    array.forEach(element => {
      element.unity = element.count;
    });

  }
  next() {
    this.cdkStepper.next();
  }
  back() {
    this.cdkStepper.previous()
  }
  
  sendToChild() {
    this.uploadSale.emit(this.calculateChanges);
    this.next();
  }
  sendToChildTwo() {
    this.uploadSale2.emit(this.calculateChanges);
    this.next();
  }

}
