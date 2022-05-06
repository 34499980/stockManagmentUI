import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

 
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChipComponent } from './chip.component';
import { OfficeService } from 'src/app/services/office.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ChipComponent
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule, 
    MatTabsModule,
    MatTooltipModule, 
    MatPaginatorModule, 
    MatSortModule, MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ChipComponent
  ],
  providers: [
    OfficeService
  ]
})
export class ChipModule { }