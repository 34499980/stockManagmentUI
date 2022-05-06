import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Discount, DiscountGet } from 'src/app/models/discount.model';
import { DiscountFilter } from 'src/app/models/discountFilter.model';
import { Office } from 'src/app/models/office.model';
import { DiscountService } from 'src/app/services/discount.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {
  searchControl: FormGroup;   
  officeData: Office[];
  discountData$: Subject<DiscountGet[]> = new Subject();
  dataSource = new MatTableDataSource([]);
  tableCountSubject = new BehaviorSubject<number>(0);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;
  sortBy = 'DATEFROM';
    sortOrder = 'desc';
  loading: boolean = true;
  displayedColumns = [
    'ID',
    'DATEFROM',  
    'DATETO',
    'PERCENT',
    'PAYMENTTYPE',
    'STOCK',
    'STATUS',
    'OFFICES'

    
    
];
  @ViewChild('table') table: ElementRef ;
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder,  
              private dialog: MatDialog,
              private discountService: DiscountService,
              private translate: TranslateService,
              private toastService: ToastService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {  
    this.officeData = this.activateRoute.snapshot.data.office as Office[];  
    this.searchControl = this.formBuilder.group({
      createFrom: [null],
      createTo: [null],
      percentFrom: [null],
      percentTo: [null],
      idOffice: [null]    
    })    
    

    this.Initializer();  

   
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
Initializer(){
  this.searchControl.valueChanges.subscribe(this.loadData);
    this.loading = true;
    this.discountData$.pipe(
      switchMap(() => {
        
        const filter : DiscountFilter = {          
          createFrom: this.searchControl.controls.createFrom.value,
          createTo: this.searchControl.controls.createTo.value,
          percentFrom: this.searchControl.controls.percentFrom.value,
          percentTo: this.searchControl.controls.percentTo.value,
          idOffice: this.searchControl.controls.idOffice.value,          
          pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        };
        return this.discountService.GetAllDiscountFilter(filter);
      })
    ).subscribe(res =>{     
       this.dataSource.data = res.data as DiscountGet[];
       this.loading = false;
       this.tableCountSubject.next(res.rowCount);
    //   this.table.nativeElement.scrollIntoView();
    });
   
  }  
  loadData(){
    this.discountData$.next();
  }
  add() {
    this.router.navigate([AppRouting.DiscountCreate])
  }
  edit(discount: Discount) {   
      this.router.navigate([AppRouting.DispatchCreate, discount.id]);
   
   

  } 
  clear(){
    this.searchControl.reset();
    
  }

}
