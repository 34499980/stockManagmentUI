import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Discount, DiscountPost } from 'src/app/models/discount.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { PaymentType } from 'src/app/models/paymentType.model';
import { Stock } from 'src/app/models/stock';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DiscountService } from 'src/app/services/discount.service';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-discount-create',
  templateUrl: './discount-create.component.html',
  styleUrls: ['./discount-create.component.scss']
})
export class DiscountCreateComponent implements OnInit {
  offices: Item[];
  paymentTypes: PaymentType[] = [];
  paytmentTypeList: Item[];
  @ViewChild('chip') chip: ElementRef;
  controlForm: FormGroup;
  loading: boolean = false;
  stock: Stock;
  cameraImage: SafeResourceUrl;
  discount: Discount;
  constructor(private activateRoute: ActivatedRoute,
    private builder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private translate: TranslateService,
    public officeService: OfficeService,
    private authenticationService: AuthenticationService,
    private stockService: StockService,
    private sanitizer: DomSanitizer,
    private discountService: DiscountService,
    private arquitecture: ArquitecturaService) { }

  ngOnInit(): void {
    // this.office = this.activateRoute.snapshot.data.office as Office;
    this.paytmentTypeList = this.activateRoute.snapshot.data.paytmentTypes as Item[];
    this.controlForm = this.builder.group({
      offices: [this.offices, [Validators.required]],
      paymentTypes: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: [ '', [Validators.required]],
      percent: [ '', [Validators.required]],
      stock: [null],

    });
    this.Initializer();
  }
  Initializer() {
    this.controlForm.controls.dateTo.disable();
    if (this.discount != undefined) {
      this.stockService.getStockByCode(this.discount.stock.code).subscribe(res => {
        this.stock = res as Stock;
        this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.stock.file);
      });
      this.controlForm.controls.offices.patchValue(this.discount.offices);
      this.paymentTypes = this.discount.paymentTypeList;
    }
    this.controlForm.controls.stock.valueChanges.subscribe(val => {
      if (val?.length == 10) {
        this.stockService.getStockByCode(val).subscribe(res => {
          this.stock = res as Stock;
          this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.stock.file);
        });
        this.controlForm.controls.stock.reset();
        this.controlForm.controls.stock.disable();
      }

    });
    this.controlForm.controls.paymentTypes.valueChanges.subscribe(val => {
      if (this.paymentTypes.find(x => x.id == val) === undefined) {
        const newItem = this.paytmentTypeList.find(x => x.id === val);
        this.paymentTypes.push(newItem);
      }


    });
    this.controlForm.controls.dateFrom.valueChanges.subscribe(val => {
      this.controlForm.controls.dateTo.enable();
      if(this.controlForm.controls.dateTo != undefined)
      {
        this.controlForm.controls.dateTo.reset();
       
      }
     
    });
  }
  updateOffices(data: Item[]){
   this.offices = data;  
   if(data.length > 0){     
     this.controlForm.controls.offices.setErrors(null);
   } 
   console.log(this.controlForm.controls)
  }
  save(override?: boolean) {
    const inputData: DiscountPost = {
      officesIds: this.offices.map(x => x.id),
      paymentType: this.paymentTypes.map(x => x.id),
      idStock: this.controlForm.controls.stock.value?? parseInt(this.controlForm.controls.stock.value ,10),
      dateFrom:  this.controlForm.controls.dateFrom.value,
      dateTo :this.controlForm.controls.dateTo.value,
      percent: parseInt(this.controlForm.controls.percent.value ,10),
      id: this.discount?.id?? null,
      idPaymentType: null,
      idUser: null,
      paymentTypeList: null,   

      stock: null,
      offices: null,
      override: override?? false
    }
    this.discountService.add(inputData).subscribe(res => {
      this.toastService.success(this.translate.instant('DISCOUNTCREATE.MESSAGE.SUCCESS'));
      this.router.navigate([AppRouting.Discount])
        },
        err => {
          this.arquitecture.openDialogConfirm(
            this.translate.instant('DIALOGS.CONFIRM-EXIT.TITLE'),
            this.translate.instant('ERRORS.errDiscountExistsDates'),
          ).subscribe(res => {
            if (res){
              this.save(true);
            } else {
              this.controlForm.reset();
            }
          })
        });
  }
  clear() {
    this.stock = undefined;
    this.controlForm.controls.stock.enable();
  }
  remove(id: number) {
   this.paymentTypes = this.paymentTypes.filter(x => x.id !== id);
  }


}
