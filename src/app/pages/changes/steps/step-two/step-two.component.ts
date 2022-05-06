import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PaymentTypeEnum } from 'src/app/enums/paymentType.enum';
import { CalculateChanges, Changes } from 'src/app/models/changes.model';
import { Item } from 'src/app/models/item.model';
import { CreditCard, PaymentType } from 'src/app/models/paymentType.model';
import { Sale_stock } from 'src/app/models/sale-stock.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
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
  sale: Sale;
  change: Changes;
  @Input() private inputSale: EventEmitter<CalculateChanges>;
  @Output() saleConfirm = new EventEmitter<Sale>();
  dataSource = new MatTableDataSource([]);
  totalSale: number;
  totalChanges: number;
  displayedColumns = [
    'CODE',
    'NAME',
    'MODEL',
    'BRAND',
    'UNITY',
    'ACTIONS'

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
    this.stepTwoForm = this.formBuilder.group({
      code: ['', [Validators.pattern(/^[0-9a-zA-Z-]+$/)]]
    });
    
   
    this.Initializer();
    this.inputSale.subscribe(data => {
      this.sale = data.sale;
      this.change = data.changes;
      this.totalSale = 0;
      this.sale.sale_stock.forEach(element => {
        const stock = this.sale.stock.find(x => x.id === element.idStock);
        stock.price = stock.stock_Office.find(x => x.idStock === stock.id &&
          x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
        stock.unity = this.sale.sale_stock.find(x => x.idStock === stock.id).unity;
        this.totalSale += stock.price * stock.unity;

      });
      this.totalChanges = 0;
      this.change.stock.forEach(element => {        
        element.price = element.stock_Office.find(x => x.idStock === element.id &&
          x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10)).price;
          element.unity = element.count;
        this.totalChanges += element.price * element.unity;

      });
    });
   

  }
 
  Initializer() {
    this.stepTwoForm.valueChanges.subscribe(val => {
      if (val.code?.length === 10) {
        this.addStock(val.code);
        this.stepTwoForm.reset();
      }
    })
  
  }
  search(code: string) {
    return this.dataSource.data.find(x => x.code === code);
  }
  searchStockByOffice(array: Stock_Office[]) {
    return array.find(x => x.idOffice === parseInt(this.authenticationService.getCurrentOffice(), 10))
  }
  addStock(code: string) {
    const stock: Stock = this.search(code);
    if (stock) {
      if (stock.unity > stock.count) {
        this.sale.sale_stock.find(x => x.idStock === stock.id).unity++;
        stock.count++;
      }
    } else {
      this.stockService.getStockByCode(code).subscribe(res => {
        const newRow = res as Stock;
        newRow.unity = this.searchStockByOffice(newRow.stock_Office).unity;
        const dispatch_stock: Sale_stock = {
          idSale: 0,
          idStock: newRow.id,
          unity: 1
        };
        this.sale.sale_stock.push(dispatch_stock);
        newRow.count++;
        if (!this.sale.stock.find(x => x.id === newRow.id)) {
          this.sale.stock.push(newRow);
        }
       
        this.dataSource.data = [...this.dataSource.data, newRow]
      });
    }

  }
  removeStock(code: string) {
    const stock = this.search(code);
    if (stock.count > 1) {
      stock.count--;
      const stockOffice = this.searchStockByOffice(stock.stock_Office);
      stockOffice.unity--;
      this.sale.sale_stock.find(x => x.idStock === stock.id).unity--;

    } else if (stock.count === 1) {
      stock.count--;
      const stockOffice = this.searchStockByOffice(stock.stock_Office);
      this.sale.sale_stock.find(x => x.idStock === stock.id).unity = 0;
      stockOffice.unity--;
      this.dataSource.data = this.dataSource.data.filter(x => x.id != stock.id);
      console.log(this.dataSource)
    }

  }
  confirm() {
   this.saleConfirm.emit(this.sale);
  }
  back(){
    this.saleConfirm.emit(null);
  }



}
