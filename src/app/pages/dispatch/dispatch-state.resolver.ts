import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataSourceService } from 'src/app/services/DataSource';


@Injectable()
export class DispatchStateResolver implements Resolve<any>
{
    private apiEndPoint: string;

    constructor(
        private service: DataSourceService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {      
       return this.service.getDispatchStates();
    }
}
