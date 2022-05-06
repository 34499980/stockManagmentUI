import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { UserLenguage } from '../models/userLenguage.modal';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  public activeLang = 'es';
  formControl: FormControl;
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.translate.setDefaultLang(this.authenticationService.getCurrentLenguage());
  }
  ngOnInit() {
    this.formControl = new FormControl()
    this.formControl.setValue(this.authenticationService.getCurrentLenguage())
  }
  public cambiarLenguaje(value) {
    this.activeLang = value;
    this.translate.use(this.activeLang);
    const userLenguage: UserLenguage = {
      userId: parseInt(this.authenticationService.getCurrentId(), 10),
      lenguage: value
    }
    this.userService.UpdateLenguage(userLenguage).subscribe();
  }
}