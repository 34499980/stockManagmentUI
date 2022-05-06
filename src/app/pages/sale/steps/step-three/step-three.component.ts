import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Discount } from 'src/app/models/discount.model';
import { Item } from 'src/app/models/item.model';
import { PaymentType } from 'src/app/models/paymentType.model';
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
  @Input() sale: Sale;
  @Input() private inputSale2: EventEmitter<Sale>; 
  @Output() saleConfirm = new EventEmitter<Sale>();
  dataSource = new MatTableDataSource([]);
  discountList: Discount[];
  paymentTypeList: Item[];
  totals: Totals[] = [];
  today: Date;
  totalAmount: number;
  displayedColumns = [
    'CODE',
    'NAME',
    'UNITY',
    'PRICE',
    'DISCOUNT',
    'SUBTOTAL',
    'TOTAL'


  ];
  constructor(private formBuilder: FormBuilder,
    private stockService: StockService,
    private authenticationService: AuthenticationService,
    private dispatchService: DispatchService,
    private toastService: ToastService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private translate: TranslateService,) { }

  ngOnInit(): void {
    this.totalAmount = 0;
    this.today = new Date();
    this.discountList = this.activateRoute.snapshot.data.Discount as Discount[];
    this.paymentTypeList = this.activateRoute.snapshot.data.PaymentType as Item[];
    const discount = this.discountList.find(x => this.today.getTime() >= new Date(x.dateFrom).getTime() && this.today.getTime() <= new Date(x.dateTo).getTime());
   
    if (this.inputSale2)
      this.inputSale2.subscribe(data => {
        this.totals = [];
        this.sale = data
        //  this.dataSource.data = [...this.dispatch.stock];  
        if (discount && discount.paymentTypeList.find(x => x.idPaymentType === this.sale.paymentType.id)) {
          if (discount.stock !== null) {
            //carga descuentos por productos
            this.sale.sale_stock.forEach(element => {
              const stock = this.sale.stock.find(x => x.id === element.idStock);
              stock.price = stock.stock_Office.find(x => x.idStock === stock.id &&
                x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
              stock.unity = this.sale.sale_stock.find(x => x.idStock === stock.id).unity;
              const discount = this.discountList.find(x => x.idStock === stock.id);
              const total: Totals = {
                code: stock.code,
                name: stock.name,
                discount: discount ? discount.percent : 0,
                price: stock.price,
                unity: stock.unity,
                subTotal: stock.price * stock.unity,
                total: this.CalculateTotal(stock, discount)
              };
              this.totals.push(total);
            });
          } else {
            //carga descuentos por toda la compra
            this.sale.sale_stock.forEach(element => {
              const stock = this.sale.stock.find(x => x.id === element.idStock);
              stock.price = stock.stock_Office.find(x => x.idStock === stock.id &&
                x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
              stock.unity = this.sale.sale_stock.find(x => x.idStock === stock.id).unity;
             // const discount = this.discountList.find(x => x.idStock === stock.id);
              const total: Totals = {
                code: stock.code,
                name: stock.name,
                discount: discount ? discount.percent : 0,
                price: stock.price,
                unity: stock.unity,
                subTotal: stock.price * stock.unity,
                total: this.CalculateTotal(stock, discount)
              };
              this.totals.push(total);
            });
          }
        } else {
          this.sale.sale_stock.forEach(element => {
            const stock = this.sale.stock.find(x => x.id === element.idStock);
            stock.price = stock.stock_Office.find(x => x.idStock === stock.id &&
              x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
            stock.unity = this.sale.sale_stock.find(x => x.idStock === stock.id).unity;           
            const total: Totals = {
              code: stock.code,
              name: stock.name,
              discount: 0,
              price: stock.price,
              unity: stock.unity,
              subTotal: stock.price * stock.unity,
              total:  stock.price * stock.unity
            };
            this.totals.push(total);
          });
        }
       this.totals.forEach(element => {
         this.totalAmount += element.total;
       })
        this.dataSource.data = this.totals;
      });





  }
  CalculateTotal(stock: Stock, discount: Discount): number {
    return (stock.price * stock.unity) - ((discount.percent * (stock.price * stock.unity)) / 100);
  }
  confirm() {
    this.saleConfirm.emit(this.sale);
  }
  back(){
    this.saleConfirm.emit(null);
  }
  

}
