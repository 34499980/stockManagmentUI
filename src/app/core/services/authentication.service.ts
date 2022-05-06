import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArquitecturaService } from '../../services/arquitectura.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { UserValidate } from 'src/app/models/userValidate.model';
import { PermissionType } from 'src/app/enums/navigation.enum';
import { Auth } from 'src/app/models/auth';


const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DEconstE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');

// tslint:disable-next-line: object-literal-shorthand
const options = {headers: headers}
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<User>;
    private _user = new  BehaviorSubject<Auth>(null);
    public currentUser: Observable<User>;
    // tslint:disable-next-line: no-construct
    public ErrorMessage = new String()
    constructor(private http: HttpClient,
                private arquitecturaService: ArquitecturaService,
                private router: Router,
                private sanitizer: DomSanitizer ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }    
     public get getCurrentUserSubject() {
        return this._user.asObservable();
      }
     
      getSession(): any{
       return sessionStorage.getItem('user');
      }
      getCurrentRole(): any{
        return sessionStorage.getItem('roleId');
       }
       getCurrentCountry(): any{
        return sessionStorage.getItem('idCountry');
       }
       getCurrentOffice(): any{
        return sessionStorage.getItem('idOffice');
       }
       getCurrentToken(): any{
        return sessionStorage.getItem('token');
       }
       getCurrentId(): any{
        return sessionStorage.getItem('userId');
       }
       getCurrentLenguage(): any{
        return sessionStorage.getItem('lenguage');
       }
       getCurrentImage = () =>{       
        
         return sessionStorage.getItem('file');
      
       }
       getCurrentPermissions = () =>{       
        
        return sessionStorage.getItem('permissions');
     
      }
       
    Autorization(value: User){        
        this.loggedIn.next(true)
        sessionStorage.setItem('userId', value.id.toString())
        sessionStorage.setItem('user', value.userName)
        sessionStorage.setItem('roleId', value.idRole.toString())
        sessionStorage.setItem('idCountry', value.idCountry.toString())
        sessionStorage.setItem('idOffice', value.idOffice.toString())
        sessionStorage.setItem('token', value.token.toString())
        sessionStorage.setItem('lenguage', value.lenguage.toString())
        sessionStorage.setItem('permissions', value.permissions.toString())
        if(value.file)
        sessionStorage.setItem('file', value.file)
        this.setAuthorization(value);
        this._user.next({
          userName: value.userName,
          permissions: value.permissions
        });
      return value
    }
    login(username: string, pass: string) {
      const user = {
        userName: username,
        password: pass
      };
        return this.http.post(environment.RestFullApi+'Authentication', user,options)
            .pipe( map(res => {return this.Autorization(res as User)})
            )
    }
    logout() {           
      this.loggedIn.next(false);
      this._user.next(null);
      sessionStorage.clear();
      this.router.navigate([AppRouting.Login]);
    }
    getImageByUser(name: string): Observable<string>{
      return this.http.get<string>(environment.RestFullApi + 'Authentication/' + name)
      .pipe(
        map(
          res => {return res}
        )
      )
    }
    setAuthorization(user: User) {
      return this.http.post(environment.RestFullApi+'Authentication/SetAuthorization', user,options).subscribe();
     
      
    }
    validate(user: UserValidate) {
      return this.http.post(environment.RestFullApi+'Authentication/Validate', user,options)
      .pipe(
        map(res =>{
          return res
        })
      );
     
      
    }
}