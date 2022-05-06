import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetAllCountries')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  getDispatchStates() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetDispatchState')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  getStockStates() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetStockState')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  getAllRoles() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetAllRoles')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  getActions() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetActions')
      .pipe(
        map(res => {
          return res
        }

        )
      )   
  }
  getSaleStates() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetSaleStates')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }
  GetPaytmentTypes() {
    return this.http.get(environment.RestFullApi + 'DataSource/GetPaytmentTypes')
      .pipe(
        map(res => {
          return res
        }

        )
      )
  }







}
