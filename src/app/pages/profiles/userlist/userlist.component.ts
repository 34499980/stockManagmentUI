import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { User, UserGet } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserFilter } from 'src/app/models/UserFilter.model';
import { ValueCache } from 'ag-grid-community';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Country } from 'src/app/models/country.model';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit {
  usersData: UserGet[];
  userSearch: UserGet[];
  searchControl: FormGroup;
  rolesData: Item[];
  officeData: Office[];   
  countriesData: Country[]; 
  loading: boolean = true;
  userData$: Subject<UserGet[]> = new Subject();
  @ViewChild('sidenav') sideNavFilters: MatDrawer;
  toggleIsFilterPanelOpen = true;
  constructor(private activateRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {

   }

  ngOnInit(): void {
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.rolesData = this.activateRoute.snapshot.data.roles as Item[];
    this.officeData = this.activateRoute.snapshot.data.office as Office[];
   
   this.searchControl = this.formBuilder.group({
     name:[''],
     office:[parseInt(this.authenticationService.getCurrentOffice(),10 )],
     role:[''],
     country:[parseInt(this.authenticationService.getCurrentCountry(), 10)],
     status: [false]
   })
   this.getUsersFilter(); 
   this.loadData();  
   this.searchControl.valueChanges.subscribe(val => {
     if((val.name != '' && val.name?.length > 3)){
      this.loadData()
     }else if(val.name === '' || val.name === null){
      this.loadData()
     }
      
   });
  }
  Add(){
    this.router.navigate([AppRouting.Profile])
  }
  getUsersFilter(){
    this.loading = true;
    this.userData$.pipe(
      switchMap(res => {
        
        const userFilter : UserFilter = {
          userName: this.searchControl.controls.name.value?? '',
          idRole: parseInt(this.searchControl.controls.role.value),
          idOffice: parseInt(this.searchControl.controls.office.value),
          idCountry: parseInt(this.searchControl.controls.country.value),
          active: parseInt(this.authenticationService.getCurrentRole()) != RolesEnum.Administrator
                  && parseInt(this.authenticationService.getCurrentRole()) != RolesEnum.Manager
          ? false: Boolean(this.searchControl.controls.status.value)
        };
        return this.userService.getUserFilter(userFilter);
      })
    ).subscribe(res =>{
       this.usersData = res as UserGet[];
       this.loading = false;
    });
   
  }
 clear(){
   this.searchControl.reset();
   this.loadData();
 }
  loadData() {
    this.userData$.next();
}
  toggleFilterSideNav(){
    this.toggleIsFilterPanelOpen? false:true
  }
  showAdministrativePermission(){
    return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrator;
  }
  
}
