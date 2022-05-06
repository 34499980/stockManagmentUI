import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Country } from 'src/app/models/country.model';
import { Item } from 'src/app/models/item.model';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userControl: FormGroup;
  user: User;
  countriesData: Country[];
  rolesData: Item[];
  officeData: Office[];
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  image: string;
  loading: boolean = false;
  base64textString = [];
  @ViewChild('file') file :ElementRef
  constructor(private formBuild: FormBuilder,
              private sanitizer: DomSanitizer,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private translate: TranslateService,
              private arquitectue: ArquitecturaService,) {
                
               }

  ngOnInit(): void {
    this.image = 'assets/userEmpty.jpg'
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.rolesData = this.activateRoute.snapshot.data.roles as Item[];
    this.officeData = this.activateRoute.snapshot.data.office as Office[];
    this.user = this.activateRoute.snapshot.data.profile as User;
    if(this.user && this.user?.file)
    this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.user.file); 

    this.userControl = this.formBuild.group({
      userName: [this.user?.userName || '', [Validators.required, Validators.maxLength(50)]],
      password: [this.user?.password || '', [Validators.required, Validators.maxLength(50)]],
      first_name: [this.user?.first_name || '', [Validators.required, Validators.maxLength(50)]],
      last_name: [this.user?.last_name || '', [Validators.required, Validators.maxLength(50)]],
      dateBorn: [this.user?.dateBorn || '', Validators.required],
      dateAdmission: [this.user?.dateAdmission || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.maxLength(50)]],
      address: [this.user?.address || '', [Validators.required, Validators.maxLength(50), this.EmailValidator]],
      postalCode: [this.user?.postalCode || '', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]\d*$/)]],
      office: [this.user?.idOffice || '', Validators.required],
      role: [ this.user?.idRole || '',[Validators.required, Validators.maxLength(50)]],
      state:[this.user?.active || false],
      country: [this.user?.idCountry || parseInt(this.authenticationService.getCurrentCountry(), 10), Validators.required],
    });
    let flag = this.canEditRole()
    if(flag){
      this.userControl.controls.role.enable()
    } else{
      this.userControl.controls.role.disable()
    }

}
validateSpinner() {
  return this.user 
}
EmailValidator(control: FormControl){
  const isEmail  = control.value.indexOf('@') && control.value.indexOf('.com') && (control.value || '').trim().length === 0 
  const isValid = ! isEmail;
  return isValid ? null : {'email': true};
}

saveUsuario() {
  this.loading = true;
  const userPost: User ={
    id: this.user? this.user.id: 0,
    address: this.userControl.controls.address.value,
    userName: this.userControl.controls.userName.value,
    password: this.userControl.controls.password.value,
    first_name: this.userControl.controls.first_name.value,
    last_name: this.userControl.controls.last_name.value,
    dateBorn: this.userControl.controls.dateBorn.value,
    dateAdmission: this.userControl.controls.dateAdmission.value,
    email: this.userControl.controls.email.value,
    postalCode: parseInt(this.userControl.controls.postalCode.value, 10),
    idOffice: parseInt(this.userControl.controls.office.value, 10),
    idRole: parseInt(this.userControl.controls.role.value, 10),
    idCountry: parseInt(this.userControl.controls.country.value, 10),
    active: Boolean(this.userControl.controls.role.value),
    file: this.base64textString.length === 0? this.user?.file: this.base64textString[0] ,
    

  }
  this.userService.saveUsuario(userPost).subscribe(() => {  
  this.loading = false;
  this.toastService.success(this.translate.instant( this.user?'USERS.ACTIONS.UPDATE': 'USERS.ACTIONS.SAVE',{user: this.userControl.controls.userName.value})),
  this.router.navigate([AppRouting.UserList])
  });
}
_handleReaderLoaded(e) {
  this.base64textString = [];
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
          
   }
OnFileSelected(event){ 
  if (this.url){
    URL.revokeObjectURL(this.url);
  }  
  this.userControl.markAsDirty();
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
    if (this.fileSelected) {
      this.url = URL.createObjectURL(this.fileSelected);
      this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

      const blob = new Blob([this.fileSelected], {type: 'image'})
      var reader = new FileReader();
        
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileSelected);
    }
  }
//Show methods
showPermissionAdmin(){
  return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrator && this.user && !this.user?.active;
}
canEdit(){
  return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrator ||
         (parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Manager 
         && this.user?.idOffice == parseInt(this.authenticationService.getCurrentOffice())) ||
         this.authenticationService.getSession() === this.user?.userName && this.user && !this.user?.active;
}
canEditRole(){
  
  return parseInt(this.authenticationService.getCurrentRole()) == RolesEnum.Administrator ||
          (parseInt(this.authenticationService.getCurrentRole()) == RolesEnum.Manager && 
          this.user?.idOffice == parseInt(this.authenticationService.getCurrentOffice()) &&
          this.authenticationService.getSession() != this.user?.userName)
}
cancel(){
  if(!this.userControl.pristine) {
    const title = this.translate.instant("DIALOGS.CONFIRM-EXIT.TITLE")
    const message = this.translate.instant("DIALOGS.CONFIRM-EXIT.MESSAGE")
    this.arquitectue.openDialogConfirm(title,message).subscribe(res =>{
      if(res){
        this.router.navigate([AppRouting.UserList])
      }
    });  
  } else {
    this.router.navigate([AppRouting.UserList])
  }
  }
}
