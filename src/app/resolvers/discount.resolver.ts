import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OfficeService } from '../services/office.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { DiscountService } from '../services/discount.service';


@Injectable()
export class DiscountResolver implements Resolve<any>
{
  
    constructor(       
        private service: DiscountService,
        private authentication: AuthenticationService
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {       
        return this.service.GetAllDiscountByOffice();
    }
}
