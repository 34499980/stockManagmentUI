import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }

  success(message){
    if(message !== '')
    this.toast.success(message)
  }
  error(message){
    if(message !== '')
    this.toast.error(message)
  }
}
