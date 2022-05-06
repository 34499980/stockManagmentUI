import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { DispatchCreateComponent } from './dispatch-create/dispatch-create.component';
import {  DispatchStateResolver } from './dispatch-state.resolver';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { DispatchResolver } from './dispatch-list/dispatch.resolver';
import { DispatchViewReciveComponent } from './dispatch-view-recive/dispatch-view-recive.component';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'all',
    component: DispatchListComponent,
    canActivate: [AuthGuard], 
    resolve:{  
      countries: CountriesResolver,
      office: OfficeResolver,
      states: DispatchStateResolver
     
    }
  },
  {
    path: 'create/:id',
    component: DispatchCreateComponent,
    canActivate: [AuthGuard], 
    resolve:{
      offices: OfficeResolver,
      countries: CountriesResolver,
      states: DispatchStateResolver,
      dispatch: DispatchResolver
    }
  },  
  {
    path: 'recive/:id',
    component: DispatchViewReciveComponent,
    canActivate: [AuthGuard], 
    resolve:{
      offices: OfficeResolver,
      countries: CountriesResolver,
      states: DispatchStateResolver,
      dispatch: DispatchResolver
    }
  },
  {
    path: 'create',
    component: DispatchCreateComponent,
    canActivate: [AuthGuard], 
    resolve:{
      offices: OfficeResolver,
      countries: CountriesResolver,
      states: DispatchStateResolver  
    }
  }
  
]


@NgModule({
  declarations: [DispatchCreateComponent, DispatchListComponent, StepOneComponent, StepTwoComponent, StepThreeComponent, DispatchViewReciveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [OfficeResolver, CountriesResolver, DispatchStateResolver, DispatchResolver]

})
export class DispatchModule { }
