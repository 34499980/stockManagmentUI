import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  public rows = new Object;
  public rowsDevolucion = new Object;
  constructor() { }
  cancelRemito(ID: Number){
        
  }
  getMetodoPago(): Observable<any>
  {
  let result = [
    {
      Titulo: 'Efectivo'
    },
    {
      Titulo: 'Debito'
    },
    {
      Titulo: 'Credito'
    }
  ]
  return of(result)
  }
  getCoutas(value): Observable<any>{
    let result= null
    if(value=="Debito"){
      
       result = [
        {
          Cuota: 1
        }
      ]
    }else{
      result = [
        {
          Cuota: 1
        },
        {
          Cuota: 3
        },
        {
          Cuota: 6
        }
      ]
    }
    
    return of(result)
  }
 
}
