import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     if(!this.authService.isLoggedIn){
      this.router.navigate([AppRouting.Login])
     }
     return true;
  }
}
