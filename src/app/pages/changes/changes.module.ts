import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { SaleStatesResolver } from 'src/app/resolvers/saleStates.resolver';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { DiscountResolver } from 'src/app/resolvers/discount.resolver';
import { PaytmentTypesesolver } from 'src/app/resolvers/paytmentTypes.resolver';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { StockBySaleResolver } from 'src/app/resolvers/stockBySale.resolver';
import { ChangesComponent } from './change/change.component';
const routes: Routes = [
  {
    path: '',
    component: ChangesComponent,
    // canActivate: [AuthGuard], 
    data: {
      // permissions: [PermissionType.OfficeList]
    },
    resolve: {
      PaymentType: PaytmentTypesesolver
    }
  }

]


@NgModule({
  declarations: [
    ChangesComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [PaytmentTypesesolver]

})
export class ChangesModule { }
