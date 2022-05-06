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
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private http: HttpClient,
              private arquitecturaService: ArquitecturaService,
              private authentication: AuthenticationService) { }
  
  
  GetAllOfficesByFilter(filter: DispatchFilter): Observable<Dispatch[]> {
    return this.http.get<Dispatch[]>(environment.RestFullApi + 'dispatch')
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetAllDispatchFilter(filter: DispatchFilter): Observable<any> {
    return this.http.post<any>(environment.RestFullApi + 'dispatch/GetDispatchFilter', filter)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  GetDispatchById(id: number): Observable<Dispatch> {
    return this.http.get<Dispatch>(environment.RestFullApi + `dispatch/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  add(dispatch: DispatchCreate): Observable<Dispatch> {
    return this.http.post<Dispatch>(environment.RestFullApi + 'dispatch', dispatch)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  update(dispatch: Dispatch): Observable<any> {
    return this.http.put<any>(environment.RestFullApi + 'dispatch', dispatch)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  updateStock(dispatch: Dispatch): Observable<any> {
    return this.http.post<any>(environment.RestFullApi + 'dispatch/FixStock', dispatch)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  delete(id: number){
    this.http.delete(environment.RestFullApi + `dispatch/${id}`)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
}
