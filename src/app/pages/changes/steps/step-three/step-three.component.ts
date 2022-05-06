import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PaymentTypeEnum } from 'src/app/enums/paymentType.enum';
import { CalculateChanges, Changes } from 'src/app/models/changes.model';
import { Discount } from 'src/app/models/discount.model';
import { Item } from 'src/app/models/item.model';
import { CreditCard, PaymentType } from 'src/app/models/paymentType.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock } from 'src/app/models/stock';
import { Totals } from 'src/app/models/totals.model';
import { DispatchService } from 'src/app/services/dispatch.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  stepThreeForm: FormGroup;
  cardForm: FormGroup;
  sale: Sale;
  changes: Changes;
  totalSale: number;
  totalChanges: number;
  paymentTypeList: Item[];
  @Input() private inputSale: EventEmitter<CalculateChanges>;
  @Output() paymentTypeSelected = new EventEmitter<PaymentType>();
  paymentType: PaymentType;
  @ViewChild('first') first: ElementRef;
  @ViewChild('second') second: ElementRef;
  @ViewChild('three') three: ElementRef;
  @ViewChild('four') four: ElementRef;
  @ViewChild('security') security: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('next') next: ElementRef;
  constructor(private formBuilder: FormBuilder,
    private stockService: StockService,
    private authenticationService: AuthenticationService,
    private dispatchService: DispatchService,
    private toastService: ToastService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private translate: TranslateService,) { }

  ngOnInit(): void {

    this.paymentTypeList = this.activateRoute.snapshot.data.PaymentType as Item[];
    this.stepThreeForm = this.formBuilder.group({
      paymentType: ['', Validators.required]
    });
    this.cardForm = this.formBuilder.group({
      first: ['', Validators.required],
      second: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required],
      security: ['', Validators.required],
      name: ['', Validators.required],
      identity: ['', Validators.required]
    });
    this.inputSale.subscribe(data => {
      this.sale = data.sale;
      this.changes = data.changes;
      this.totalSale = 0;
      this.sale.sale_stock.forEach(element => {
        const stock = this.sale.stock.find(x => x.id === element.idStock);
        stock.price = stock.stock_Office.find(x => x.idStock === stock.id &&
          x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
        stock.unity = this.sale.sale_stock.find(x => x.idStock === stock.id).unity;
        this.totalSale += stock.price * stock.unity;

      });
      this.totalChanges = 0;
      this.changes.stock.forEach(element => {
        
        element.price = element.stock_Office.find(x => x.idStock === element.id &&
          x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
          element.unity = element.count;
        this.totalChanges += element.price * element.unity;

      });
      if (this.totalSale == this.totalChanges || this.totalChanges > this.totalSale && this.totalChanges !== undefined) {
        this.confirm();
      }
    });


    this.Initializer();
    this.cardInitializer()

  }
  ShowCardOption() {
    return this.stepThreeForm.controls.paymentType.value === this.paymentTypeList.find(x => x.id === PaymentTypeEnum.Card).id;
  }
  Initializer() {
    this.stepThreeForm.controls.paymentType.valueChanges.subscribe(val => {
      this.cardForm.reset();
    });
  }
  cardInitializer() {
    this.cardForm.controls.first.valueChanges.subscribe(val => {
      if (val?.length === 4) {
        this.second.nativeElement.focus();
      }
    });
    this.cardForm.controls.second.valueChanges.subscribe(val => {
      if (val?.length === 4) {
        this.three.nativeElement.focus();
      }
    });
    this.cardForm.controls.three.valueChanges.subscribe(val => {
      if (val?.length === 4) {
        this.four.nativeElement.focus();
      }
    });
    this.cardForm.controls.four.valueChanges.subscribe(val => {
      if (val?.length === 4) {
        this.security.nativeElement.focus();
      }
    });
    this.cardForm.controls.security.valueChanges.subscribe(val => {
      if (val?.length === 3) {
        this.name.nativeElement.focus();
      }
    });
    this.cardForm.controls.identity.valueChanges.subscribe(val => {
      if (val?.length === 8) {
        this.next.nativeElement.focus();
      }
    });
  }
  confirm() {
    const card: CreditCard = {
      cardNumber: parseInt((this.cardForm.controls.first.value + this.cardForm.controls.second.value +
        this.cardForm.controls.three.value + this.cardForm.controls.four.value), 10),
      name: this.cardForm.controls.name.value,
      identity: parseInt(this.cardForm.controls.identity.value, 10),
      security: parseInt(this.cardForm.controls.security.value, 10)
    }
    const paymentType: PaymentType = {
      id: parseInt(this.stepThreeForm.controls.paymentType.value, 10),
      creditCard: card
    }


    this.paymentTypeSelected.emit(paymentType);
  }
  back() {
    this.paymentTypeSelected.emit(null);
  }


}
