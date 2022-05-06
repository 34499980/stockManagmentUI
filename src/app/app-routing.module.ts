import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouting } from './enums/AppRouting.enum';
import { LoginComponent } from './pages/login/login.component';
import { RolesResolver } from './resolvers/roles.resolver';
import { OfficeResolver } from './resolvers/office.resolver';
import { AuthGuard } from './core/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch : 'full'
  },
  {
    path: AppRouting.Login,
    loadChildren: () => import('../app/pages/login/login.module'). then(m => m.LoginModule)
  },
  {
    path: AppRouting.Home,
    loadChildren: () => import('../app/pages/home/home.module'). then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRouting.Profile,
    loadChildren: () => import('../app/pages/profiles/profile.module'). then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRouting.Office,
    loadChildren: () => import('./pages/office/office.module'). then(m => m.OfficeModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRouting.Stock,
    loadChildren: () => import('./pages/Stock/stock.module'). then(m => m.StockModule)
   
  },
  {
    path: AppRouting.Dispatch,
    loadChildren: () => import('./pages/dispatch/dispatch.module'). then(m => m.DispatchModule)
   
  },
  {
    path: AppRouting.History,
    loadChildren: () => import('./pages/history/history.module'). then(m => m.HistoryModule)
   
  },
  {
    path: AppRouting.Sale,
    loadChildren: () => import('./pages/sale/sale.module'). then(m => m.SaleModule)
   
  },
  {
    path: AppRouting.Discount,
    loadChildren: () => import('./pages/discount/discount.module'). then(m => m.DiscountModule)
   
  },
  {
    path: AppRouting.Changes,
    loadChildren: () => import('./pages/changes/changes.module'). then(m => m.ChangesModule)
   
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled',
    enableTracing: false,
    onSameUrlNavigation: 'reload'
  }),
],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
