import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OfficeService } from 'src/app/services/office.service';


@Injectable()
export class OfficeDetailService implements Resolve<any>
{

    constructor(
        private service: OfficeService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
       const id = route.params.id;
       return this.service.getOfficeById(id);
    }
}
