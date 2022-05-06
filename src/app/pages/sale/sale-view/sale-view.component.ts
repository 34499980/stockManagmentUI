import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, Observable } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
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
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.scss']
})
export class SaleViewComponent implements OnInit {
  searchControl: FormGroup;
  loading: boolean
  sale: Sale;
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'CODE',
    'NAME',
    'MODEL',
    'BRAND',
    'UNITY'

  ];

  constructor(private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private officeService: OfficeService,
    private stockService: StockService,
    private dispatchService: DispatchService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService) {


  }

  ngOnInit(): void {
    this.sale = this.activateRoute.snapshot.data.sale as Sale;
    this.dataSource.data = this.sale.stock as Stock[];
    this.searchControl = this.formBuilder.group({
      code: ['', [Validators.pattern(/^[0-9a-zA-Z-]+$/)]]
    });

  } 
  Initializer(){
    this.searchControl.controls.code.valueChanges.subscribe(val => {
      if (val?.length == 10) {
        const stockList = this.sale.stock.filter(x => x.code !== val);
        this.dataSource.data = stockList;
      }
     
    });  
  }
  cancel() {
    this.router.navigate([AppRouting.Sale + '/all']);
  }


}
