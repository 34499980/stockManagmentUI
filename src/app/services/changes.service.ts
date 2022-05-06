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
import { CalculateChanges } from '../models/changes.model';
const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor(private http: HttpClient,
              private arquitecturaService: ArquitecturaService,
              private authentication: AuthenticationService) { }  
  
 
 
  GetSaleById(id: number) {
    return this.http.get(environment.RestFullApi + `sales/GetSaleById/${id}`)
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  GenerateChanges(inputData: CalculateChanges) {
    return this.http.post(environment.RestFullApi + `sales/GenerateChanges`, inputData)
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
}
