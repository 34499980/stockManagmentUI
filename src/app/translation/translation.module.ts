import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslationComponent } from './translation.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    SharedModule
    
    
  ],
  exports:[TranslationComponent],
  providers: []

})
export class TranslationModule { }
