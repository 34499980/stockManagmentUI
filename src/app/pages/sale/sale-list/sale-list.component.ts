import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { DispatchState } from 'src/app/enums/dispatch-state.enum';
import { Country } from 'src/app/models/country.model';
import { Dispatch, DispatchGet } from 'src/app/models/dispatch';
import { DispatchFilter } from 'src/app/models/dispatchFilter.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { Sale, SaleGet } from 'src/app/models/sale.model';
import { SalesFilter } from 'src/app/models/salesFilter.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DispatchService } from 'src/app/services/dispatch.service';
import { OfficeService } from 'src/app/services/office.service';
import { SaleService } from 'src/app/services/sale.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SalesListComponent implements OnInit, AfterViewInit {
  searchControl: FormGroup;  
  officeData: Office[];
  countriesData: Country[];
  statesData: Item[];
  saleData$: Subject<Sale[]> = new Subject();
  officeData$: Subject<Office[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  tableCountSubject = new BehaviorSubject<number>(0);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;
  sortBy = 'DATEPROCES';
    sortOrder = 'desc';
  loading: boolean = true;
  displayedColumns = [
    'CODE',
    'DATEPROCESS',  
    'USERNAME',
    'OFFICE',
    'AMOUNT',
    'STATE',
    'ACTIONS'
    
];
  @ViewChild('table') table: ElementRef ;
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private saleService: SaleService,
              private officeService: OfficeService,
              private dialog: MatDialog,
              private arquitectureService: ArquitecturaService,
              private translate: TranslateService,
              private toastService: ToastService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.officeData = this.activateRoute.snapshot.data.office as Office[];
  //  this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.statesData = this.activateRoute.snapshot.data.states as Item[];
    this.searchControl = this.formBuilder.group({
      code: [null],
      dateFrom: [null],
      dateTo: [null],
      userName: [null],
      office: [null],
      state: [null]    
    })    
    

    this. getFilter();
   // this.loadData();

    this.searchControl.valueChanges.subscribe(val => {
      if(val.userName !== '' || val.userName !== null  && val.userName?.length >= 3){
       this.loadData();
        } else if (val.userName === '' || val.userName === null){
          this.loadData();
        }
      });
  }
  ngAfterViewInit(): void {
    this.loadData();
    this.paginator._intl.itemsPerPageLabel = '';
   // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //  this.searchControl.valueChanges.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page)
      .pipe(
        tap(_ => {
            this.loadData();
        })
      )
      .subscribe();
  }
  setSortingOrder(sort) {
    this.sortOrder = sort;
    this.loadData();
}

setSortingBy(sort) {
    this.sortBy = sort;
    this.loadData();
}
setMatSorting(sort: Sort) {
    if (this.sortBy !== sort.active) {
        this.setSortingBy(sort.active);
    }
    if (this.sortOrder !== sort.direction) {
        sort.direction = sort.direction || this.sortOrder === 'asc' ? 'desc' : 'asc';
        this.setSortingOrder(sort.direction);
    }
}
  getFilter(){
    
    this.saleData$.pipe(
      tap(() => this.loading = true),
      switchMap(() => {
        
        const filter: SalesFilter = {
          id: parseInt(this.searchControl.controls.code.value, 10), 
          userName: this.searchControl.controls.userName.value,
          dateProcesFrom: this.searchControl.controls.dateFrom.value,
          dateProcesTo: this.searchControl.controls.dateTo.value,
          idOffice: this.searchControl.controls.office.value,
          idState: parseInt(this.searchControl.controls.state.value, 10),         
          pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        };
        return this.saleService.GetSalesByFilters(filter);
      })
    ).subscribe(res =>{     
       this.dataSource.data = res.data as SaleGet[];
       this.loading = false;
       this.tableCountSubject.next(res.rowCount);
    //   this.table.nativeElement.scrollIntoView();
    });
   
  }
 
  loadData(){
    this.saleData$.next();
  }
  add() {
    this.router.navigate([AppRouting.Sale + '/create'])
  }
  edit(sale: Sale) {
    
      this.router.navigate([AppRouting.Sale + '/view', sale.id]);  

  }
  remove(sale: Sale) {
    this.arquitectureService.openDialogConfirm(
      this.translate.instant('DIALOGS.CANCEL-SALE.TITLE'),
      this.translate.instant('DIALOGS.CANCEL-SALE.MESSAGE')
    ).subscribe(res => {
      if (res) {
        this.saleService.ReturnAllSale(sale.id).subscribe(() => {
          this.toastService.success(this.translate.instant('SALES.ACTIONS.RETURNED'));
          this.loadData();
        });
      }
    });
  }
  
 
  clear(){
    this.searchControl.reset();
  }

}
