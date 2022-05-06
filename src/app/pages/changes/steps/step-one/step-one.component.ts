import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, Observable } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SaleState } from 'src/app/enums/sale-state.enum';
import { Changes } from 'src/app/models/changes.model';
import { Country } from 'src/app/models/country.model';
import { Dispatch } from 'src/app/models/dispatch';
import { DispatchCreate } from 'src/app/models/dispatch-create.model';
import { Office } from 'src/app/models/office.model';
import { Sale_stock } from 'src/app/models/sale-stock.model';
import { Sale } from 'src/app/models/sale.model';
import { Stock, StockChanges } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { ChangesService } from 'src/app/services/changes.service';
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
  @Input() sale: Changes;
  //@Input() private inputSale: EventEmitter<Sale>;
  @Output() saleConfirm = new EventEmitter<Changes>();
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
    private changesService: ChangesService,
    private dispatchService: DispatchService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService) {


  }

  ngOnInit(): void {
    this.stepOneForm = this.formBuilder.group({
      code: ['', [Validators.pattern(/^[0-9a-zA-Z-]+$/)]]
    });

  /*  if (this.inputSale)
      this.inputSale.subscribe(data => {
        this.sale = data
      });*/


  }
  search() {
    this.changesService.GetSaleById(this.stepOneForm.controls.code.value).subscribe(res => {
      if (res) {
        this.sale = res as Changes;
        this.dataSource.data = this.sale.stock as StockChanges[];
        // this.saleConfirm.emit(this.sale);
      } else {
        // no existe el numero de venta
      }
    });
  }
  searchItem(code: string) {
    return this.dataSource.data.find(x => x.code === code);
  }
  addStock(code: string) {
    const stock: StockChanges = this.searchItem(code);
    if (stock) {
      if (stock.unity > stock.count) {
        stock.count++;
        stock.check = true;
      }
    }


  }
  removeStock(code: string) {
    const stock = this.searchItem(code);
    if (stock.count > 0) {
      stock.count--;
    }
    if(stock.count == 0){
      stock.check = false;
    }
  }
  check(code: string) {
    const stock: StockChanges = this.searchItem(code);
    if(stock.unity !== stock.count) {
      stock.count = stock.unity;
      stock.check = true;
    } else {
      stock.count = 0;
      stock.check = false;
    }
  }
  validateConfirm(){
    return this.dataSource.data?.find(x => x.check)
  }
  confirm() {
    this.saleConfirm.emit(this.sale);
  }



}
