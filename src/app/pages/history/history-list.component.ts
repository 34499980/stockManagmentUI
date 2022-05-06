import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Country } from 'src/app/models/country.model';
import { HistoryFilter } from 'src/app/models/historyFilter.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { HistoryService } from 'src/app/services/history.service';
import { OfficeService } from 'src/app/services/office.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  searchControl: FormGroup; 
  countriesData: Country[];
  actionsData: Item[];
  officeData$:  BehaviorSubject<Office[]> = new BehaviorSubject([]); 
  actionData$:  BehaviorSubject<Item[]> = new BehaviorSubject([]); 
  officeData: Office[];
  historyData$: Subject<History[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  tableCountSubject = new BehaviorSubject<number>(0);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;
  sortBy = 'DATEPROCES';
    sortOrder = 'desc';
  loading: boolean = true;
  displayedColumns = [
    'DATEPROCES',
    'USERNAME',
    'OFFICE',
    'ACTION',
    'DETAIL',
    
];
@ViewChild('sidenav') sideNavFilters: MatDrawer;
toggleIsFilterPanelOpen = true;
constructor(private activateRoute: ActivatedRoute,
  private formBuilder: FormBuilder,
  private historyService: HistoryService,
  private dialog: MatDialog,
  private translate: TranslateService,   
  private router: Router,
  private officeService: OfficeService,
  private toastService: ToastService,
  private arquitecturaService: ArquitecturaService,
  private authentication: AuthenticationService) { }

  ngOnInit(): void { 
    this.officeData = this.activateRoute.snapshot.data.offices as Office[];
    this.actionsData = this.activateRoute.snapshot.data.actions as Item[];
   // this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.searchControl = this.formBuilder.group({
      userName: [''],
      idOffice: [parseInt(this.authentication.getCurrentOffice(),10 )],
      dateProcesFrom: [null],
      dateProcesTo: [null],
      action: [''],
      idCountry : ['']     

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

    this.searchControl.controls.action.valueChanges.subscribe(this.loadData);

    
    this.getHistoryFilter();
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


  getHistoryFilter(){
    this.loading = true;
    this.historyData$.pipe(
      switchMap(res => {
        
        const historyFilter : HistoryFilter = {
          userName: this.searchControl.controls.userName.value,
          idOffice: this.searchControl.controls.idOffice.value ? parseInt(this.searchControl.controls.idOffice.value, 10) : null,
          dateProcesFrom: this.searchControl.controls.dateProcesFrom.value,
          dateProcesTo: this.searchControl.controls.dateProcesTo.value,
          action: this.searchControl.controls.action.value ? parseInt(this.searchControl.controls.action.value, 10) : null,         
          pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        }
        return this.historyService.getHistoryByFilter(historyFilter);
      })
    ).subscribe(res =>{
       this.dataSource.data = res.data as Stock_Office[];
       this.tableCountSubject.next(res.rowCount);
       this.loading = false;
      
    });
    

  }
  loadData(){
    this.historyData$.next();
  }
  clear(){
    this.searchControl.reset();
    this.searchControl.controls.idCountry.setValue(parseInt(this.authentication.getCurrentCountry(), 10));
    this.searchControl.controls.idOffice.setValue(parseInt(this.authentication.getCurrentOffice(), 10))
    this.loadData();
  }
 

}
