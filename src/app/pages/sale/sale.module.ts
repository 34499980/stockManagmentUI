import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleComponent } from './create-sale/sale.component';
import { SalesListComponent } from './sale-list/sale-list.component';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { SaleStatesResolver } from 'src/app/resolvers/saleStates.resolver';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { DiscountResolver } from 'src/app/resolvers/discount.resolver';
import { PaytmentTypesesolver } from 'src/app/resolvers/paytmentTypes.resolver';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { SaleViewComponent } from './sale-view/sale-view.component';
import { StockBySaleResolver } from 'src/app/resolvers/stockBySale.resolver';
const routes: Routes = [
    {
      path: 'create',
      component: SaleComponent,
     // canActivate: [AuthGuard], 
      data: {
       // permissions: [PermissionType.OfficeList]
      },
       resolve: {
        Discount: DiscountResolver,
        PaymentType: PaytmentTypesesolver
      } 
    },
    {
      path: 'all',
      component: SalesListComponent,
     // canActivate: [AuthGuard], 
      data: {
       // permissions: [PermissionType.OfficeList]
      },
      resolve: {
        office: OfficeResolver,
        states: SaleStatesResolver

      } 
    }
    ,
    {
      path: 'view/:id',
      component: SaleViewComponent,
     // canActivate: [AuthGuard], 
      data: {
       // permissions: [PermissionType.OfficeList]
      },
      resolve: {
       sale: StockBySaleResolver

      } 
    }
  
]


@NgModule({
  declarations: [SaleComponent, SalesListComponent,
    SaleViewComponent,
    StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [SaleStatesResolver, OfficeResolver, DiscountResolver, PaytmentTypesesolver, StockBySaleResolver]

})
export class SaleModule { }
