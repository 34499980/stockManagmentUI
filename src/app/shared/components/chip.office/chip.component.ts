import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { DataSourceService } from 'src/app/services/DataSource';
import { OfficeService } from 'src/app/services/office.service';

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chip',
  templateUrl: 'chip.component.html',
  styleUrls: ['chip.component.css'],
})
export class ChipComponent implements OnInit, ControlValueAccessor, OnChanges {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    clientAutoComplete$: Observable<Item[]> = null;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @Input() chipCtrl: FormControl;
    @Input() array: Item[];
    @Input() serviceToAll: () => Observable<any>;
    @Input() select: (name: string) => Observable<any>;
    @Output() outEvent = new EventEmitter();
    filteredselectedItems: Observable<string[]>;
    selectedItems: BehaviorSubject<Item[]> = new BehaviorSubject([]);
  
    // labelString = '';
  
    @Input() placeholder: string;
    @Input() permissionAdd = false;
    @Input() context: string;
    @Input() label: string;
    chipControlFormError = false;
    @Input() permissionRemove = false;
    @Input() assistantInputHs;
    @Input() isTechnicians = false;
  
    // @Output() selectedItemsChange = new EventEmitter<UserItem[]>();
    // @Output() newAssistantDataSource = new EventEmitter<any>();
    // @Output() delAssistantDataSource = new EventEmitter<any>();
    @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>;
  //  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
    onChange = (x) => {};
    onTouched = (x) => {};

    constructor(
       
        private translateService: TranslateService
      
        // @Self() @Optional() public control: NgControl,
        ) {
          // this.control.valueAccessor = this;
      }
  ngOnChanges(changes: SimpleChanges): void {
    this.array?.forEach(newItem => {
      if (!this.validateExist(newItem))
      this.selectedItems.next([...this.selectedItems.value, newItem]);
    })
   
  }
  selectAll(){
    this.serviceToAll().subscribe(res => {
      res?.forEach(newItem => {
        if (!this.validateExist(newItem))
        this.selectedItems.next([...this.selectedItems.value, newItem]);
      })
      this.outEvent.emit(this.selectedItems.value);
    });
    
  }
    writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }
    
    ngOnInit() {
        // if (this.label === 'colab') {
        //   this.labelString = this.translateService.instant('COLLABSCHIP.COLLABS-AUTOR');
        // }
        // if (this.label === 'asist') {
        //   this.labelString = this.translateService.instant('COLLABSCHIP.ASISTANTS');
        //  }
        this.chipCtrl = new FormControl();
    
        this.setObservable();
        this.selectedItems.subscribe(items => {
          this.onChange(items);
        });
      }
      private setObservable() {
        this.clientAutoComplete$ = this.chipCtrl.valueChanges.pipe(
          startWith(''),
          // delay emits
          debounceTime(300),
          // use switch map so as to close previous subscribed events, before creating new once
          switchMap(value => {
            if (value !== '') {
              // lookup from github
              return this.search(value);
            } else {
              // if no value is pressent, return null
              return of(null);
            }
          })
        );
      }
      search(value: string): Observable<Item[]> {
        return this.select(value.toLowerCase()).pipe(
          // catch errors
          catchError(_ => {
            return of(null);
          })
        );
        /*  return this.service.GetOfficeChipByName(value.toLowerCase()).pipe(
            // catch errors
            catchError(_ => {
              return of(null);
            })
          );*/
        
      }
     /* selected(event: MatAutocompleteSelectedEvent): void {
        // let newAssistant = {
        //   userId: event.option.value.id,
        //   fullUserName: event.option.value.description
        // }
    
        const newItem = event.option.value;
        if (!this.validateExist(newItem)) {
          this.selectedItems.next([...this.selectedItems.value, newItem]);
        }
        this.groupInput.nativeElement.value = '';
        this.chipCtrl.setValue('');
    
        // this.clientAutoComplete$ = null;
        // this.setObservable();
        // this.newAssistantDataSource.emit(newAssistant);
        // this.selectedItemsChange.emit(this.selectedItems);
      }*/
      validateExist(newAssistant: Item): boolean {
        return this.selectedItems.value.some(x => x.id === newAssistant.id);
      }
      add(event: MatChipInputEvent): void {}

      remove(item, indx: number): void {
        // this.delAssistantDataSource.emit(item);
        this.selectedItems.next(this.selectedItems.value.filter(x => x.id !== item.id));
        this.outEvent.emit(this.selectedItems.value);
        // this.selectedItems.splice(indx, 1);
        // this.selectedItemsChange.emit(this.selectedItems);
      }
      selected(event: MatAutocompleteSelectedEvent): void {
        // let newAssistant = {
        //   userId: event.option.value.id,
        //   fullUserName: event.option.value.description
        // }
    
        const newItem = event.option.value;
        if (!this.validateExist(newItem)) {
          this.selectedItems.next([...this.selectedItems.value, newItem]);
        }
        this.outEvent.emit(this.selectedItems.value);
        this.groupInput.nativeElement.value = '';
        this.chipCtrl.setValue('');
    
        // this.clientAutoComplete$ = null;
        // this.setObservable();
        // this.newAssistantDataSource.emit(newAssistant);
        // this.selectedItemsChange.emit(this.selectedItems);
      }
      colabLostFocus() {
        // if(this.chipControlFormRequired){
        //     if(this.selectedItems && this.selectedItems.length > 0) {
        //       this.chipControlFormError = false;
        //     }
        //     if(!this.selectedItems || this.selectedItems.length < 1) {
        //         this.chipControlFormError = true;
        //     }
        //   }
      }
    

}
