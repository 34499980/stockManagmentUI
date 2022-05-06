import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Country } from 'src/app/models/country.model';
import { Dispatch } from 'src/app/models/dispatch';
import { Office } from 'src/app/models/office.model';
import { MatStepper } from '@angular/material/stepper';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { DispatchService } from 'src/app/services/dispatch.service';
import { DispatchState } from 'src/app/enums/dispatch-state.enum';

@Component({
  selector: 'app-dispatch-create',
  templateUrl: './dispatch-create.component.html',
  styleUrls: ['./dispatch-create.component.scss']
})
export class DispatchCreateComponent implements OnInit, AfterViewInit {
  officesData: Office[];
  countriesData: Country[];
  dispatch: Dispatch;
  @Output() uploadDispatch: EventEmitter<Dispatch> = new EventEmitter<Dispatch>();
  @ViewChild('cdkStepper') cdkStepper: MatStepper
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private translate: TranslateService,
              private dispatchService: DispatchService) { }
  ngAfterViewInit(): void {
    if (this.dispatch) {
      this.uploadDispatch.emit(this.dispatch);
      this.cdkStepper.selectedIndex = 1;
     }
  }

  ngOnInit(): void {
    this.dispatch = this.activatedRoute.snapshot.data.dispatch as Dispatch;
    this.officesData = this.activatedRoute.snapshot.data.offices as Office[];
    this.countriesData = this.activatedRoute.snapshot.data.countries as Country[];   
  }

  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }
  next() {   
    this.cdkStepper.next();
  }
  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.uploadDispatch.emit(dispatch);
    this.next();
  }
  updateDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.toastService.success(this.translate.instant('DISPATCH.ACTIONS.UPDATE'))
    this.router.navigate([AppRouting.DispatchList])
  }
  confirm(dispatch: Dispatch) {
    dispatch.idState = DispatchState.Dispatched;
    this.dispatchService.update(dispatch).subscribe(() => {
      this.toastService.success(this.translate.instant('DISPATCH.ACTIONS.UPDATE'))
    })
    this.next();
  }

}
