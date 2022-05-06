import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PaymentTypeEnum } from 'src/app/enums/paymentType.enum';
import { Item } from 'src/app/models/item.model';
import { CreditCard, PaymentType } from 'src/app/models/paymentType.model';
import { DispatchService } from 'src/app/services/dispatch.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  stepTwoForm: FormGroup;
  cardForm: FormGroup;
  paymentTypeList: Item[];
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
    this.stepTwoForm = this.formBuilder.group({
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
    this.Initializer();
    this.cardInitializer()

  }
  ShowCardOption() {
    return this.stepTwoForm.controls.paymentType.value === this.paymentTypeList.find(x => x.id === PaymentTypeEnum.Card).id;
  }
  Initializer() {
    this.stepTwoForm.controls.paymentType.valueChanges.subscribe(val => {
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
      id: parseInt(this.stepTwoForm.controls.paymentType.value, 10),
      creditCard: card
    } 
    
    
    this.paymentTypeSelected.emit(paymentType);
  }
  back(){
    this.paymentTypeSelected.emit(null);
  }



}
