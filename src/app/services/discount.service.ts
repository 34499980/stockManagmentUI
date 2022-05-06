import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ArquitecturaService } from './arquitectura.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { DiscountFilter } from '../models/DiscountFilter.model';
import { Discount, DiscountGet } from '../models/discount.model';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient,
              private arquitecturaService: ArquitecturaService,
              private authentication: AuthenticationService) { }
  
  
  GetAllDiscountByOffice(): Observable<Discount[]> {
    return this.http.get<Discount[]>(environment.RestFullApi + 'discount')
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetAllDiscountFilter(filter: DiscountFilter): Observable<any> {
    return this.http.post<any>(environment.RestFullApi + 'discount/GetDiscountFilter', filter)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetDiscountById(id: number): Observable<Discount> {
    return this.http.get<Discount>(environment.RestFullApi + `discount/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  add(Discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(environment.RestFullApi + 'discount', Discount)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  update(Discount: Discount): Observable<any> {
    return this.http.put<any>(environment.RestFullApi + 'discount', Discount)
      .pipe(
        map(res => {
          return res;
        })
      );
  } 
  delete(id: number){
    this.http.delete(environment.RestFullApi + `discount/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
}
