import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { PermissionType } from 'src/app/enums/navigation.enum';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private router: Router,
              private artuitecturaService: ArquitecturaService,
              private translate: TranslateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.auth.getCurrentUserSubject.pipe(
      first(),
      map(user => {
        if (!user) {
          this.artuitecturaService.openDialog('Error', this.translate.instant( 'ERROR-MESSAGE.ACCESS')); 
         // return this.router.parseUrl(AppRouting.Login);
        }
        if (!next.data?.permissions) {
          this.artuitecturaService.openDialog('Error', this.translate.instant( 'ERROR-MESSAGE.ACCESS')); 
         // return this.router.parseUrl('/unauthorized');
        }
        var result: boolean;
        const permissionsData: PermissionType | PermissionType[] = next.data.permissions;
        if (Array.isArray(permissionsData)) {
          result = (permissionsData).every(p => user.permissions.includes(p));
        } else {
          result = user.permissions.includes(permissionsData);
        }
        return result //|| this.router.parseUrl('/unauthorized');
      })
    );
  }
}
