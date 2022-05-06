import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class UserResolver implements Resolve<any>
{
    private apiEndPoint: string;

    constructor(
        private service: UserService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
       const userName = route.params.id;
       return this.service.getUsuariosByUserName(userName);
    }
}
