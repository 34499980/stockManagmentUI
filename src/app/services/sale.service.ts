import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { DispatchFilter } from '../models/dispatchFilter.model';
import { Dispatch } from '../models/dispatch';
import { DispatchCreate } from '../models/dispatch-create.model';
import { Sale } from '../models/sale.model';
import { SalesFilter } from '../models/salesFilter.model';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient,
              private arquitecturaService: ArquitecturaService,
              private authentication: AuthenticationService) { }  
  
 
  add(input: Sale): Observable<Dispatch> {
    return this.http.post<Dispatch>(environment.RestFullApi + 'sales/Save', input)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  update(input: Sale): Observable<any> {
    return this.http.post<any>(environment.RestFullApi + 'sales/Save', input)
      .pipe(
        map(res => {
          return res;
        })
      );
  } 
  GetSalesByFilters(input: SalesFilter): Observable<any> {
    return this.http.post<any>(environment.RestFullApi + 'sales/GetSalesByFilters', input)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  delete(id: number){
    this.http.delete(environment.RestFullApi + `sale/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  GetStockBySale(id: number) {
    return this.http.get(environment.RestFullApi + `sales/GetStockBySaleId/${id}`)
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  ReturnAllSale(id: number) {
    return this.http.get(environment.RestFullApi + `sales/ReturnAllSale/${id}`)
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
}
