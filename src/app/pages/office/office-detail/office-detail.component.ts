import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { RolesEnum } from 'src/app/enums/Roles.Enum';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { OfficeService } from 'src/app/services/office.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
 office: Office;
 countriesData: Country[];
 controlForm: FormGroup;
 loading: boolean = false;
  constructor(private activateRoute: ActivatedRoute,
              private builder: FormBuilder,
              private officeService: OfficeService,
              private toastService: ToastService,
              private router: Router,
              private translate: TranslateService,
              private authenticationService: AuthenticationService,
              private arquitecture: ArquitecturaService) { }

  ngOnInit(): void {
    this.office = this.activateRoute.snapshot.data.office as Office;
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.controlForm = this.builder.group({
      name: [this.office?.name || '' , [Validators.required, Validators.maxLength(250)]],
      address: [this.office?.address || '' , [Validators.required, Validators.maxLength(250)]],
      postalCode: [this.office?.postalCode || '' , [Validators.required, Validators.maxLength(4)]],
      country: [this.office?.idCountry || parseInt(this.authenticationService.getCurrentCountry(), 10) , [Validators.required]],     
      status: [this.office?.active || false]
      
    })
  }
  saveOffice(){
    const office: Office = {
      id: this.office? this.office.id: 0,
      name: this.controlForm.controls.name.value,
      address: this.controlForm.controls.address.value,
      idCountry: parseInt(this.controlForm.controls.country.value,10),
      postalCode: parseInt(this.controlForm.controls.postalCode.value,10),
      active: Boolean(this.controlForm.controls.status)
    } 
    if(!this.office){
      this.add(office);
    }else{
      this.update(office);
    }   
  
  }
  add(office: Office){
    this.loading = true;
    this.officeService.add(office).subscribe(() => {  
      this.toastService.success(this.translate.instant( 'OFFICE.ACTIONS.SAVE')),
      this.loading = false;
      this.router.navigate([AppRouting.OfficeList])
      });
  }
  update(office: Office){
    this.loading = true;
    this.officeService.update(office).subscribe(() => {  
      this.toastService.success(this.translate.instant( 'OFFICE.ACTIONS.UPDATE')),
      this.loading = false;
      this.router.navigate([AppRouting.OfficeList])
      });
  }
  showPermissionAdmin(){
    return parseInt(this.authenticationService.getCurrentRole()) === RolesEnum.Administrator && this.office && !this.office?.active;
  }
  cancel(){
    if(!this.controlForm.pristine) {
      const title = this.translate.instant("DIALOGS.CONFIRM-EXIT.TITLE")
      const message = this.translate.instant("DIALOGS.CONFIRM-EXIT.MESSAGE")
      this.arquitecture.openDialogConfirm(title,message).subscribe(res =>{
        if(res){
          this.router.navigate([AppRouting.OfficeList])
        }
      });  
    } else {
      this.router.navigate([AppRouting.OfficeList])
    }
    }

}
