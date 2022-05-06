import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent    
  }
]


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [],
  exports:[]
})
export class HomeModule { }
