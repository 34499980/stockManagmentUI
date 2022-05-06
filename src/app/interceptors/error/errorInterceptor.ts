import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private artuitecturaService: ArquitecturaService,
        private translate: TranslateService,
        private router: Router
      ) {
      }
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>>{
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {  
          if (error.error == 'errDiscountExistsDates'){
            return throwError(error.status);
          }
          if(error.error){
            this.artuitecturaService.openDialog('Error', this.translate.instant( 'ERRORS.' + error.error))
          } else{
            alert(this.translate.instant('ERRORS-MESSAGE.ACCESS'))
            this.router.navigate([AppRouting.Login]);           
          }       
           
          return throwError(error.status);
        })
      )
  }
}