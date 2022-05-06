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
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {
 

  constructor(private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private officeService: OfficeService,
    private stockService: StockService,
    private dispatchService: DispatchService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService) {


  }

  ngOnInit(): void {


  }




}
