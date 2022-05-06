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
import { Item } from 'src/app/models/item.model';
import { PaymentType } from 'src/app/models/paymentType.model';
import { Sale_stock } from 'src/app/models/sale-stock.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { SaleService } from 'src/app/services/sale.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
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
  paymentType: PaymentType;
  dataSource = new MatTableDataSource([]);
  checkOk = 'assets/ok_check.png';
  checkNotOk = 'assets/notok_check.png'
  showButton: Boolean;
  editable: boolean;
  @Output() uploadSale: EventEmitter<Sale> = new EventEmitter<Sale>();
  @Output() uploadSale2: EventEmitter<Sale> = new EventEmitter<Sale>();
  // @Output() uploadPaymentType: EventEmitter<PaymentType> = new EventEmitter<PaymentType>();
  @ViewChild('cdkStepper') cdkStepper: MatStepper
  displayedColumns = [
    'CODE',
    'NAME',
    'MODEL',
    'BRAND',
    'UNITY',
    'ACTIONS'

  ];
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private builder: FormBuilder,
    private toastService: ToastService,
    private translate: TranslateService,
    private saleService: SaleService,
    private stockService: StockService,
    private authenticationService: AuthenticationService,
    private arquitectura: ArquitecturaService) { }

  ngOnInit(): void {
    this.editable = true;
    // this.sendToChild();

  }
  ngAfterViewInit(): void {
    if (this.sale) {
      this.uploadSale.emit(this.sale);
    }
  }
  cancel() {
    this.router.navigate([AppRouting.Sale + '/all']);
  }
  updateSale(sale: Sale) {
    if (sale == null) {
      this.back();
    } else {
      this.sale = sale;
      this.sendToChild();
    }

  }
  updateSaleFinish(sale: Sale) {
    if (sale == null) {
      this.back();
    } else {
      this.sale = sale;
      this.editable = false;
      this.saleService.add(this.sale).subscribe(() => {
        this.sendToChild();
        this.toastService.success(this.translate.instant('SALESCREATE.MESSAGE.SUCCESS'))
      });     
    }

  }
  paymentTypeSelectedParent(selected: PaymentType) {
    if (selected == null) {
      this.back();
    } else {
      this.paymentType = selected;
      this.sale.paymentType = this.paymentType;
      this.sendToChildTwo();
    }

  }
  next() {
    this.cdkStepper.next();
  }
  back() {
    this.cdkStepper.previous()
  }
  sendToChild() {
    this.uploadSale.emit(this.sale);
    this.next();
  }
  sendToChildTwo() {
    this.uploadSale2.emit(this.sale);
    this.next();
  }

}
