import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageFile } from 'src/app/models/image.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  _usuario: any
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoggedIn$: Observable<boolean>;
  image: any;
  cameraImage: SafeResourceUrl;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private arquitecturaService: ArquitecturaService,
      private breakpointObserver: BreakpointObserver,
      private userService: UserService,
        private sanitizer: DomSanitizer 
  ) {
  }

  ngOnInit() {
    this.image = 'assets/userEmpty.jpg'
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      // tslint:disable-next-line: no-string-literal
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onFocusOutEvent(event){
    if(event.target.value)
    this.authenticationService.getImageByUser(event.target.value).subscribe(res => {
      const imageFile = res as unknown as ImageFile;
      this.cameraImage = imageFile.image// this.sanitizer.bypassSecurityTrustResourceUrl(imageFile.image);
    })
  }
  login(){
    this.loading = false
    this.router.navigate(['Home'])
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  getUsers(){
    this.userService.getUsuarios().subscribe(res => {console.log(res)})
  }
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.authenticationService.login(this.f.username.value, this.f.password.value).
      subscribe(res =>
              {
                  this.login()
              },
              error => {
                this.loading = false;
                this.loginForm.reset();
              }
              )
      this.loading = true;

}
}
