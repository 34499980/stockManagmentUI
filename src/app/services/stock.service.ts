import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../core/services/authentication.service';
import { ArquitecturaService } from './arquitectura.service';
import { map, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { Stock, StockGet, StockPost } from '../models/stock';
import { StockFilter } from '../models/stockFilter.mode';
import { Stock_Office } from '../models/stock_office.model';

const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  http: HttpClient
  constructor(http: HttpClient,private authentication: AuthenticationService,private arquitecturaService: ArquitecturaService) {
    this.http = http
   }  
  saveStock(stock : StockPost): Observable<any>{ 

  return  this.http.post(environment.RestFullApi+'stock', stock).pipe(
    map(res => {
    return res
    })
  );
  }
  updaeStock(stock : StockPost): Observable<any>{  

   return  this.http.put(environment.RestFullApi+'stock', stock).pipe(
      map(res => {
      return res
      })
    );
    }
  getStockByFilter(filter: StockFilter): Observable<any>{
    return  this.http.post<any>(environment.RestFullApi+'stock/GetStockFilter',filter)
    .pipe(
        map(res => {
        return res
        })
    );
  }
  getStockById(id: number): Observable<Stock>{
    return  this.http.get<Stock>(environment.RestFullApi+`stock/GetStockById/${id}`)
    .pipe(
        map(res => {
        return res
        })
    );
  }
  getStockByCode(code: string): Observable<any>{
    return  this.http.get<any>(environment.RestFullApi+`stock/GetStockByCode/${code}`)
    .pipe(
        map(res => {
        return res
        })
    );
  }
  delete(id: number){
    return  this.http.delete(environment.RestFullApi+`stock/${id}`)
    .pipe(
        map(res => {
        return res
        })
    );
  }

}
