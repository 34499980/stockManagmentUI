import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { User, UserGet } from 'src/app/models/user';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { DialogconfirmComponent } from '../../dialogs/dialogconfirm/dialogconfirm.component';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() user: UserGet;
 @Output() reloadEvent = new EventEmitter<boolean>();
  image: string
  cameraImage: SafeResourceUrl;
  _param: any
  @ViewChild('file') file :ElementRef
  _fileSelected: File = null
 _router: Router
  constructor(private router: Router,
              private arquitecturaService: ArquitecturaService,
              private dialog: MatDialog,
              private userService: UserService,
              private toastService: ToastService,
              private translate: TranslateService,
              private sanitizer: DomSanitizer,
              private authentication: AuthenticationService
             ) {
    this._router = router
   }

  ngOnInit(): void {
      if(this.user && this.user?.file)
      this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.user.file);      
      this.image = 'assets/userEmpty.jpg'
    
   
    
    this.arquitecturaService.getCamposPerfil().subscribe(res => {this._param = res})

  }
  VerPerfil(user: any): void{
    this._router.navigate([AppRouting.Profile, user.userName])
  }
  OnFileSelected(event){
    this.file.nativeElement.click()
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this._fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected !== undefined) {

    }

  }
  delete(user: any) {
    const title = this.translate.instant('DIALOGS.DELETE-USER.TITLE')
    const message = this.translate.instant('DIALOGS.DELETE-USER.MESSAGE')
    const dialogRef = this.dialog.open(DialogconfirmComponent,
       {
      disableClose: true,     
      data:{title: title, message: message}
        });
      
       dialogRef.afterClosed().subscribe(result => {
         if(result === true){
          this.userService.remove(this.user.id).subscribe(() => 
          {this.toastService.success(this.translate.instant('USERS.ACTIONS.DELETE' ,{user: user.userName}))
          this.reloadEvent.emit(true);
          //window.location.reload();
        });
      }
   });
  }
  canEdit(){
    return parseInt(this.authentication.getCurrentRole()) === RolesEnum.Administrator ||
            (parseInt(this.authentication.getCurrentRole()) === RolesEnum.Manager && 
            this.user.idRole !== RolesEnum.Administrator && this.user.idRole !== RolesEnum.Manager) ||
           (parseInt(this.authentication.getCurrentRole()) === RolesEnum.Manager 
           && this.user?.idOffice == parseInt(this.authentication.getCurrentOffice())) &&
           this.user.userName == this.authentication.getSession()
           
  }
 


}
