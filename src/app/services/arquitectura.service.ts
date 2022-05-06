import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../shared/dialogs/dialogMessage/dialogMessage.component';
import { DialogconfirmComponent } from '../shared/dialogs/dialogconfirm/dialogconfirm.component';
import { map } from 'rxjs/operators';
import { Dispatch } from '../models/dispatch';
import { ModalDispatchComponent } from '../shared/dialogs/modal-dispatch/modal-dispatch.component';
import { DialogValidateComponent } from '../shared/dialogs/dialogValidate/dialogValidate.component';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Country } from '../models/country.model';
import { Office } from '../models/office.model';
import { StockGet } from '../models/stock';
import { ModalStockComponent } from '../shared/dialogs/modal-stock/modal-stock.component';
@Injectable({
  providedIn: 'root'
})
export class ArquitecturaService {
 _dialog: MatDialog
  constructor(dialog: MatDialog) {
this._dialog = dialog
   }
  getCamposPerfil(): Observable<any> {
const param = [
{
  param:'userName',
  type: 'text'
},
{
  param:'Password',
  type: 'password'
},
{
  param:'Nombre',
  type: 'text'
},
{
  param: 'Apellido',
  type: 'text'
},
{
  param: 'FechaNacimiento',
  type: 'date'
},
{
  param: 'FechaIngreso',
  type: 'date'
},
{
  param: 'Email',
  type: 'text'
},
{
  param: 'Direccion',
  type: 'text',
},
{
  param: 'CodPostal',
  type: 'text'
}
]
return of(param)
  }
 getColumnsGridVentas(): Observable<any>{
  const columns = [
{
header:'Codigo',
dataKey: 'Code'

},
{
header: 'Nombre',
dataKey: 'Name'
},
{
header: 'Marca',
dataKey: 'Brand'
},
{
header: 'Modelo',
dataKey: 'Model'
},
{
header: 'Precio',
dataKey: 'Price'
},
{
header: 'Unidades',
dataKey: 'Unity'
},
{
header: 'SubTotal',
dataKey: 'SubTotal'
},
{
header: ' ',
dataKey: 'deconste'
}
  ]
  return of(columns)
 }
 getColumnsGridAnular(): Observable<any>{
  const columns = [
{
header:'Id Transacción',
field: 'ID'

},
{
header: 'Fecha',
field: 'date'
},
{
header: 'Usuario',
field: 'user'
},
{
header: 'Total',
field: 'total'
},
{
header: 'Remito',
field: 'remito'
},
{
header: 'Estado',
field: 'state'
},
{
header: 'Anular',
field: 'Anular'
}
  ]
  return of(columns)
 }
 getColumnsGridAnuladas(): Observable<any>{
  const columns = [
{
headerName:'ID',
header:'id',
field: 'ID',
sortable: true,
filter: true,
dataKey: 'ID',
width: 100


},
{
headerName:'Fecha proceso',
header:'Fecha proceso',
field: 'dateProcess',
sortable: true,
filter: true,
dataKey: 'dateProcess',
width: 150

},
{
headerName: 'Usuario',
header: 'Usuario',
field: 'user',
sortable: true,
filter: true,
dataKey : 'user',
width: 150
},
{
headerName: 'Monto',
header: 'Monto',
field: 'total',
sortable: true,
filter: true,
dataKey: 'total',
width: 150
},
{
headerName: 'Remito',
header: 'Remito',
field: 'remito',
sortable: true,
filter: true,
dataKey: 'remito'
},
{
headerName: 'Office',
header: 'Office',
field: 'Office',
sortable: true,
filter: true,
dataKey:'office'
},
{
headerName:'Fecha anulación',
header:'Fecha anulación',
field: 'dateAnnultmen',
sortable: true,
filter: true,
dataKey: 'dateAnnultmen',
width: 150
}
  ]
  return of(columns)
 }
 getColumnsGridMovimientos(): Observable<any>{
  const columns = [
{
headerName:'ID',
header:'id',
field: 'ID',
sortable: true,
filter: true,
dataKey: 'ID',
width: 100

},
{
headerName:'Fecha',
header:'Fecha',
field: 'date',
sortable: true,
filter: true,
dataKey: 'date',
width: 150

},
{
headerName: 'Usuario',
header: 'Usuario',
field: 'user',
sortable: true,
filter: true,
dataKey : 'user',
width: 150
},
{
headerName: 'Monto',
header: 'Monto',
field: 'total',
sortable: true,
filter: true,
dataKey: 'total',
width: 150
},
{
headerName: 'Remito',
header: 'Remito',
field: 'remito',
sortable: true,
filter: true,
dataKey: 'remito'
},
{
headerName: 'Office',
header: 'Office',
field: 'office',
sortable: true,
filter: true,
dataKey:'office'
}
  ]
  return of(columns)
 }
 getColumnsGridStock(): Observable<any>{
  const columns = [
{
headerName:'ID',
header:'id',
field: 'ID',
sortable: true,
filter: true,
dataKey: 'Code',
width: 100

},
{
headerName:'Nombre',
header:'Nombre',
field: 'name',
sortable: true,
filter: true,
dataKey: 'Name',
width: 150

},
{
headerName: 'Marca',
header: 'Brand',
field: 'brand',
sortable: true,
filter: true,
dataKey : 'Bran',
width: 150
},
{
headerName: 'Modelo',
header: 'Model',
field: 'model',
sortable: true,
filter: true,
dataKey: 'Model',
width: 150
},
{
headerName: 'Office',
header: 'Office',
field: 'office',
sortable: true,
filter: true,
dataKey:'Office'
},
{
headerName: 'Cantidad',
header: 'Cantidad',
field: 'Count',
sortable: true,
filter: true,
dataKey:'Count'
},
{
headerName: 'Detalles',
header: 'Detalles',
field: 'Details',
sortable: true,
filter: true,
dataKey:'Details'
}
  ]
  return of(columns)
 }
 getDespachoColumns(): Observable<any>{
  const result = [
{
headerName:'ID',
header:'ID',
field: 'id',
sortable: true,
filter: true,
dataKey: 'id'
},
{
 headerName:'FECHA CREACION',
 header:'FECHA CREACION',
 field: 'dateCreate',
 sortable: true,
 filter: true,
 dataKey: 'dateCreate'
},
{
headerName:'USUARIO ORIGEN',
header:'USUARIO ORIGEN',
field: 'idUserOrigin',
sortable: true,
filter: true,
dataKey: 'idUserOrigin'
 },
 {
headerName:'USUARIO RECIBIDO',
header:'USUARIO RECIBIDO',
field: 'idUserDestiny',
sortable: true,
filter: true,
dataKey: 'idUserDestiny'
 },
 {
headerName:'ORIGEN',
header:'ORIGEN',
field: 'origin',
sortable: true,
filter: true,
dataKey: 'origin'
 },
 {
headerName:'DESTINO',
header:'DESTINO',
field: 'destiny',
sortable: true,
filter: true,
dataKey: 'destiny'
 },
 {
headerName:'ESTADO',
header:'ESTADO',
field: 'idState',
sortable: true,
filter: true,
dataKey: 'idState'
 },
 {
headerName:'FECHA DESPACHADO',
header:'FECHA DESPACHADO',
field: 'dateDispatched',
sortable: true,
filter: true,
dataKey: 'dateDispatched'
 },
 {
headerName:'FECHA RECIBIDO',
header:'FECHA RECIBIDO',
field: 'dateRecived',
sortable: true,
filter: true,
dataKey: 'dateRecived'
 }
 ,
 {
headerName:'Bultos',
header:'Bultos',
field: 'unity',
sortable: true,
filter: true,
dataKey: 'unity'
 }
  ]

  return of(result)
 }
 getDespachoColumnsData(): Observable<any>{
  const result = [{
headerName:'Code',
header:'Code',
field: 'Code',
sortable: true,
filter: true,
dataKey: 'Code',
width: 60
  },
  {
   headerName:'Nombre',
   header:'Name',
   field: 'Name',
   sortable: true,
   filter: true,
   dataKey: 'Name',
   width: 60
  },
  {
headerName:'Marca',
header:'Brand',
field: 'Brand',
sortable: true,
filter: true,
dataKey: 'Brand',
width: 60
   },
   {
headerName:'Modelo',
header:'Model',
field: 'Model',
sortable: true,
filter: true,
dataKey: 'Model',
width: 60
   },
   {
headerName:'Unidades',
header:'Unity',
field: 'Unity',
sortable: true,
filter: true,
dataKey: 'Unity',
width: 30
   }]

  return of(result)
 }
 openDialog(title: string, text: string){
  const dialogRef = this._dialog.open(DialogMessageComponent, {
disableClose: true,
data : {_title: title, _text: text}
  });

 dialogRef.afterClosed().subscribe(result => {
   if(result === true){

   }
 });
}
openDialogConfirm(title: string, message: string){
  const dialogRef = this._dialog.open(DialogconfirmComponent, {
  disableClose: true,
  data : {title: title, message: message}
  });

 return dialogRef.afterClosed().pipe(
   map(res => {return res}    
   )
  )
}
openDialogDispatch(dispatch: Dispatch){
  const dialogRef = this._dialog.open(ModalDispatchComponent, {
  disableClose: true,
  data : {dispatch: dispatch}
  });

 return dialogRef.afterClosed().pipe(
   map(res => {return res}    
   )
  )
}
openDialogStock(officeData: Office[], countriesData: Country[], stock?: StockGet){
  return this._dialog.open(ModalStockComponent,{
    disableClose: true,  
    height: '480px',
     width: '65%',
     data: {
            countriesData: countriesData,
            stock:  stock,
            officeData: officeData  
          }      
  })
}
openDialogValidate(){
  const dialogRef = this._dialog.open(DialogValidateComponent, {
    width: "300px",
    height: "auto",
    disableClose: true,
    data : {}
  });

 return dialogRef.afterClosed().pipe(
   map(res => {return res}    
   )
  )
}

}
