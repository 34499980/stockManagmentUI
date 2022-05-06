import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { DiscountCreateComponent } from './create/discount-create.component';
import { PaytmentTypesesolver } from 'src/app/resolvers/paytmentTypes.resolver';
const routes: Routes = [
  {
    path: '',
    component: DiscountListComponent,
    canActivate: [AuthGuard],
    resolve: {
      office: OfficeResolver,
    }   
  
  },{
    path: 'create',
    component: DiscountCreateComponent,
    canActivate: [AuthGuard],
    resolve: {
      office: OfficeResolver,
      paytmentTypes: PaytmentTypesesolver
    }   
  },{
    path: 'create/:id',
    component: DiscountCreateComponent,
    canActivate: [AuthGuard],
    resolve: {
      office: OfficeResolver,
    }   
  }
  
]


@NgModule({
  declarations: [DiscountListComponent, DiscountCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [OfficeResolver, PaytmentTypesesolver]

})
export class DiscountModule { }
