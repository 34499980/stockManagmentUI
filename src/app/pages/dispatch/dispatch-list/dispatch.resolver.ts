import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DispatchService } from 'src/app/services/dispatch.service';


@Injectable()
export class DispatchResolver implements Resolve<any>
{
    private apiEndPoint: string;

    constructor(
        private service: DispatchService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const id: number = route.params.id;
        return this.service.GetDispatchById(id);
    }
}
