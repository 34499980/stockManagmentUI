import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, Observable } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SaleState } from 'src/app/enums/sale-state.enum';
import { Country } from 'src/app/models/country.model';
import { Dispatch } from 'src/app/models/dispatch';
import { DispatchCreate } from 'src/app/models/dispatch-create.model';
import { Office } from 'src/app/models/office.model';
import { Sale_stock } from 'src/app/models/sale-stock.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { DispatchService } from 'src/app/services/dispatch.service';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
  @Input() sale: Sale;
  @Input() private inputSale: EventEmitter<Sale>;
  @Output() saleConfirm = new EventEmitter<Sale>();
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'CODE',
    'NAME',
    'MODEL',
    'BRAND',
    'UNITY',
    'ACTIONS'

  ];

  constructor(private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private officeService: OfficeService,
    private stockService: StockService,
    private dispatchService: DispatchService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService) {


  }

  ngOnInit(): void {
    this.stepOneForm = this.formBuilder.group({
      code: ['', [Validators.pattern(/^[0-9a-zA-Z-]+$/)]]
    });

    if (this.inputSale)
    this.inputSale.subscribe(data => {
      this.sale = data
    });

    this.stepOneForm.valueChanges.subscribe(val => {
      if (val.code?.length === 10) {
        this.addStock(val.code);
        this.stepOneForm.reset();
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



}
