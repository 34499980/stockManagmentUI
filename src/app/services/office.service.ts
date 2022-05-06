import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { Office } from '../models/office.model';
import { OfficeFilter } from '../models/officeFilter.mode';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }
  add(office :Office){
    return  this.http.post(environment.RestFullApi+'office', office)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  delete(id: number){
    return  this.http.delete(environment.RestFullApi+`office/${id}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  update(office: Office){
    return  this.http.put(environment.RestFullApi+'office', office)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  getOfficeByFilter(filter: OfficeFilter): Observable<any>{
    return  this.http.post<any>(environment.RestFullApi+'office/GetOfficeFilter', filter)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  getOfficeById(id: number){
    return  this.http.get(environment.RestFullApi+`office/GetOfficeById/${id}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  getOfficesByCountry(id: number): Observable<Office[]>{
    return  this.http.get<Office[]>(environment.RestFullApi+`office/GetOfficesByCountry/${id}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  GetOfficesAllChipByCountry = () =>{
    return  this.http.get<Item[]>(environment.RestFullApi+`office/GetOfficesChipByCountry/${name}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  getAllOffices(){
    return  this.http.get(environment.RestFullApi+`office`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  GetOfficeChipByName(name: string): Observable<Item[]>{
    return  this.http.get<Item[]>(environment.RestFullApi+`office/GetOfficeChipByName/${name}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  GetOfficeSelectChipByName = (name: string) => {
    return  this.http.get<Item[]>(environment.RestFullApi+`office/GetOfficeChipByName/${name}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }
  GetOfficesChipByCountry(): Observable<Item[]>{
    return  this.http.get<Item[]>(environment.RestFullApi+`office/GetOfficesChipByCountry/${name}`)
    .pipe(
        map(res => {
            return res
        })
    );
  }

}
