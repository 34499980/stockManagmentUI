import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { Stock, StockGet } from 'src/app/models/stock';
import { StockFilter } from 'src/app/models/stockFilter.mode';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';
import { DialogconfirmComponent } from 'src/app/shared/dialogs/dialogconfirm/dialogconfirm.component';
import { ModalStockComponent } from 'src/app/shared/dialogs/modal-stock/modal-stock.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  searchControl: FormGroup; 
  countriesData: Country[];
  officeData$:  BehaviorSubject<Office[]> = new BehaviorSubject([]); 
  officeData: Office[];
  stockData$: Subject<Stock[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  tableCountSubject = new BehaviorSubject<number>(0);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;
  sortBy = 'CODE';
    sortOrder = 'desc';
  loading: boolean = true;
  displayedColumns = [
    'CODE',
    'NAME',
    'BRAND',
    'MODEL',
    'OFFICE',
    'UNITY',   
    'ACTIONS'
    
];
@ViewChild('sidenav') sideNavFilters: MatDrawer;
toggleIsFilterPanelOpen = true;
constructor(private activateRoute: ActivatedRoute,
  private formBuilder: FormBuilder,
  private stockService: StockService,
  private dialog: MatDialog,
  private translate: TranslateService,   
  private router: Router,
  private officeService: OfficeService,
  private toastService: ToastService,
  private arquitecturaService: ArquitecturaService,
  private authentication: AuthenticationService) { }

  ngOnInit(): void { 
    this.officeData = this.activateRoute.snapshot.data.offices as Office[];
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.searchControl = this.formBuilder.group({
      name: [''],
      code: [''],
      brand: [''],
      model:[''],
      idOffice: [parseInt(this.authentication.getCurrentOffice(), 10)],
      idCountry: [parseInt(this.authentication.getCurrentCountry(), 10)]

    })
      this.searchControl.controls.idCountry.valueChanges.pipe(
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      }),
      startWith(this.officeData)
      ).subscribe(this.officeData$);
    
    this.getStockFilter();
   // this.loadData();
    this.searchControl.valueChanges.subscribe(val => {
    //  if((val.name !== '' || val.name !== null  && val.name?.length > 3) ||
      //  (val.postalCode !== '' && val.postalCode !== null && val.postalCode?.length === 4)){
       this.loadData();
      //  } else if ((val.name === '' || val.name) && (val.postalCode === '' || val.postalCode)){
     //     this.loadData();
     //   }
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


  getStockFilter(){
    this.loading = true;
    this.stockData$.pipe(
      switchMap(res => {
        
        const stockFilter : StockFilter = {
          name: this.searchControl.controls.name.value,
          brand: this.searchControl.controls.brand.value,
          code: this.searchControl.controls.code.value,
          idCountry: parseInt(this.searchControl.controls.idCountry.value,10),
          idOffice:parseInt(this.searchControl.controls.idOffice.value,10),
          model: this.searchControl.controls.model.value,
          pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        }
        return this.stockService.getStockByFilter(stockFilter);
      })
    ).subscribe(res =>{
       this.dataSource.data = res.data as Stock_Office[];
       this.tableCountSubject.next(res.rowCount);
       this.loading = false;
      
    });
    

  }
  loadData(){
    this.stockData$.next();
  }
  clear(){
    this.searchControl.reset();
    this.searchControl.controls.idCountry.setValue(parseInt(this.authentication.getCurrentCountry(), 10));
    this.searchControl.controls.idOffice.setValue(parseInt(this.authentication.getCurrentOffice(), 10))
    this.loadData();
  }
  addStock(){  
   this.arquitecturaService.openDialogStock(this.officeData, this.countriesData).afterClosed().subscribe(res => {
      if(res){
        this.loadData();
      }
      });
  }
  deleteStock(id: number){
    const title = this.translate.instant('DIALOGS.DELETE-STOCK.TITLE')
    const message = this.translate.instant('DIALOGS.DELETE-STOCK.MESSAGE')
    const dialogRef = this.dialog.open(DialogconfirmComponent,
       {
      disableClose: true,     
      data:{title: title, message: message}
        });
      
       dialogRef.afterClosed().subscribe(res => {
         if(res){
          this.stockService.delete(id).subscribe(() => 
          {this.toastService.success(this.translate.instant('STOCK.ACTIONS.DELETE')),
         this.loadData();
        });
      }
   });
  }
  editStock(id: number){
    this.stockService.getStockById(id).subscribe(res => {
      res.unity = res.stock_Office.find(x => x.idOffice == res.idOffice).unity
     this.arquitecturaService.openDialogStock(this.officeData, this.countriesData, res as StockGet)
      .afterClosed().subscribe(res => {
        if(res){
          this.loadData();
        }
        });
    })
 
  }
  showEditPermission(stock_office){
    return (RolesEnum.Administrator == this.authentication.getCurrentRole() ||
            stock_office.office.id == this.authentication.getCurrentOffice())
  }
  showPermission() {
    return (RolesEnum.Administrator == this.authentication.getCurrentRole())
  }

}
