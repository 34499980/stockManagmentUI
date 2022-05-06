import { Component, ElementRef, Inject, Input, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { Stock, StockGet, StockPost } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';
import { InputrequiredComponent } from '../../components/inputrequired/inputrequired.component';

@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.component.html',
  styleUrls: ['./modal-stock.component.css']
})
export class ModalStockComponent implements OnInit {
  stockForm: FormGroup;
  officeForm: FormGroup;
  officeData$:  BehaviorSubject<Office[]> = new BehaviorSubject([]); 
  officeData: Office[];
  countriesData: Country[];
  stock_office: Stock_Office[];
  maxlength: number = 1024;
  stock: StockGet;
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  loading: boolean = false;
  image: SafeUrl = '../assets/imageNotFound.png';
  base64textString = [];
  @ViewChild('file') file :ElementRef
  @ViewChild('code') code :InputrequiredComponent
  @ViewChild('name') name :InputrequiredComponent
  @ViewChild('brand') brand :InputrequiredComponent
  @ViewChild('model') model :InputrequiredComponent
  constructor(private builder: FormBuilder,
              private sanitizer: DomSanitizer,
              private officeService: OfficeService,
              private stockService:  StockService,           
              @Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<ModalStockComponent>,
              private authentication: AuthenticationService) {
       this.countriesData = data.countriesData; 
       this.stock = data.stock;
       this.officeData = data.officeData;
       if(this.stock)
       this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.stock.file);  
         
               }

  ngOnInit(): void {   
    this.stock_office = this.stock?.stock_Office; 
    this.officeForm = this.builder.group({
      idOffice: [parseInt(this.authentication.getCurrentOffice(), 10)],
      idCountry: [parseInt(this.authentication.getCurrentCountry(), 10) ]
    })
    this.selectedOffice();
    this.stockForm = this.builder.group({      
      code: [this.stock?.code || '' , [Validators.required, Validators.maxLength(250)]],
      name: [this.stock?.name || '' , [Validators.required, Validators.maxLength(250)]],
      brand: [this.stock?.brand || '' , [Validators.required, Validators.maxLength(250)]],
      model: [this.stock?.model || '' , [Validators.required, Validators.maxLength(250)]],
      description: [this.stock?.description || '' , [Validators.maxLength(1024)]],     
      unity: [this.InitialUnity() || 0,  [Validators.required]],
      price: [this.InitialPrice() || 0,  [Validators.required]]
      
    })    
     this.officeForm.controls.idCountry.valueChanges.pipe(     
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      }),
      startWith(this.officeData)
      ).subscribe(this.officeData$);          
    
  }
  InitialUnity() {
  return this.stock_office?.find(x => x.idOffice === parseInt(this.authentication.getCurrentOffice(), 10)).unity;
  }
  InitialPrice() {
    return this.stock_office?.find(x => x.idOffice === parseInt(this.authentication.getCurrentOffice(), 10)).price;
    }
  showPermission() {
    return ((RolesEnum.Administrator !== parseInt(this.authentication.getCurrentRole(), 10)) &&
           (RolesEnum.Manager !== parseInt(this.authentication.getCurrentRole(), 10) &&
            this.officeForm.controls.idOffice.value !== parseInt(this.authentication.getCurrentOffice(), 10)))
  }
  OnFileSelected(event){ 
    if (this.url){
      URL.revokeObjectURL(this.url);
    }  
    this.stockForm.markAsDirty();
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
      if (this.fileSelected) {
        this.url = URL.createObjectURL(this.fileSelected);
        this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  
        const blob = new Blob([this.fileSelected], {type: 'image'})
        var reader = new FileReader();
          
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.fileSelected);
      }
     
  } 
  selectedOffice(){
    this.officeForm.controls.idOffice.valueChanges.subscribe(idOffice => {
      this.stockForm.markAsPristine();
      this.stockForm.controls.code.setValue(this.stock?.code);
      this.stockForm.controls.name.setValue(this.stock?.name);
      this.stockForm.controls.brand.setValue(this.stock?.brand);
      this.stockForm.controls.model.setValue(this.stock?.model);
      this.stockForm.controls.description.setValue(this.stock?.description);
      let stock_Officelist = this.stock_office?.find(x => x.idOffice === idOffice)
      if (this.authentication.getCurrentOffice() == idOffice || this.authentication.getCurrentRole() == RolesEnum.Administrator) {
        this.code.setDisabledState(false);
        this.name.setDisabledState(false);
        this.brand.setDisabledState(false);
        this.model.setDisabledState(false); 
        this.stockForm.controls.unity.enable();      
        this.stockForm.controls.description.enable();   
        this.officeForm.controls.idCountry.enable();   
      } else {
        this.code.setDisabledState(true);
        this.name.setDisabledState(true);
        this.brand.setDisabledState(true);
        this.model.setDisabledState(true);  
        this.stockForm.controls.unity.disable();   
        this.stockForm.controls.description.disable();           
        this.officeForm.controls.idCountry.disable();    
      }
     
      if(stock_Officelist){
        this.stockForm.controls.unity.setValue(stock_Officelist.unity);
        this.officeForm.controls.price.setValue(stock_Officelist.price)
      }
    });
     
      

    
  }
  _handleReaderLoaded(e) {
  this.base64textString = [];
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
          
   }
  save() {  
    let stock_Officelist = this.stock_office?.find(x => x.idOffice === this.officeForm.controls.idOffice.value)
    if(!stock_Officelist){
      const newStockOffice: Stock_Office = {
        id: 0,
        idOffice: parseInt(this.officeForm.controls.idOffice.value, 10),
        idStock: this.stock? this.stock.id : 0,
        unity: parseInt(this.stockForm.controls.unity.value, 10),
        price: parseInt(this.stockForm.controls.price.value, 10),
      }
      
    this.stock_office = [...[], newStockOffice]
    } else {
      stock_Officelist.unity = parseInt(this.stockForm.controls.unity.value, 10)
    }
     
    
    const stockPost: StockPost = {
      id: this.stock? this.stock.id : 0,
      code: this.stockForm.controls.code.value,
      qr: this.stock? this.stock.qr : '0',
      name: this.stockForm.controls.name.value,
      brand: this.stockForm.controls.brand.value,
      model: this.stockForm.controls.model.value,
      description: this.stockForm.controls.description.value,
      idState: 1,  
      idOffice: parseInt(this.officeForm.controls.idOffice.value, 10),      
      file: this.base64textString.length === 0? this.stock.file: this.base64textString[0] ,
      stock_Office: this.stock_office,
      idCountry: parseInt(this.officeForm.controls.idCountry.value, 10),
    }
    if(!this.stock){
      this.add(stockPost);
    }else{
      this.update(stockPost);
    }
    
   
  }
  add(stockPost: StockPost){
    this.loading = true;
    this.stockService.saveStock(stockPost).subscribe(() => {
      this.dialogRef.close(true);
      this.loading = false;
    })
  }
  update(stockPost: StockPost){
    this.loading = true;
    this.stockService.updaeStock(stockPost).subscribe(() => {
      this.dialogRef.close(true);
      this.loading = false;
    })
  }

}
