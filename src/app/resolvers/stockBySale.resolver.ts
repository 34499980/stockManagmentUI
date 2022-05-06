import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataSourceService } from '../services/DataSource';
import { SaleService } from '../services/sale.service';


@Injectable()
export class StockBySaleResolver implements Resolve<any>
{
    private apiEndPoint: string;

    constructor(
        private service: SaleService
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const id = parseInt(route.paramMap.get('id'))
        return this.service.GetStockBySale(id);
    }
}
