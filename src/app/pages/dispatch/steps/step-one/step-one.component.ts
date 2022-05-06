import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Country } from 'src/app/models/country.model';
import { Dispatch } from 'src/app/models/dispatch';
import { DispatchCreate } from 'src/app/models/dispatch-create.model';
import { Office } from 'src/app/models/office.model';
import { DispatchService } from 'src/app/services/dispatch.service';
import { OfficeService } from 'src/app/services/office.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
 
  officesData$: Subject<Office[]> = new Subject();
  @Input() countriesData: Country[];
  @Input() officesData: Office[];
  @Output() dispatch =  new EventEmitter<Dispatch>();
  @Input() private uploadDispatch: EventEmitter<Dispatch>;
  disabledButton: boolean
  constructor(private formBuilder: FormBuilder,
              private activateRoute: ActivatedRoute,
              private officeService: OfficeService,
              private dispatchService: DispatchService,
              private authenticationService: AuthenticationService,
              private toastService: ToastService) {

    
  }

  ngOnInit(): void {  
    if (this.uploadDispatch) {
      this.uploadDispatch.subscribe(data => {
        this.dispatch = data;
        const dispatchTemp: Dispatch = this.dispatch as unknown as Dispatch
        this.stepOneForm.controls.office.setValue(dispatchTemp?.idDestiny); 
        this.disabledButton = true;    
      });
    }
    this.disabledButton = false;
    this.stepOneForm = this.formBuilder.group({
      office: [ '', Validators.required],
      country: [parseInt(this.authenticationService.getCurrentCountry(), 10), Validators.required]
    });   

    this.stepOneForm.controls.country.valueChanges.pipe(     
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      }),
      startWith(this.officesData)
      ).subscribe(this.officesData$);  
  
  }

  stepOneSubmit() {
    const dispatch: DispatchCreate = {
      idOrigin: parseInt(this.authenticationService.getCurrentOffice(), 10),
      idDestiny: parseInt(this.stepOneForm.controls.office.value,10),
      idCountry:  parseInt(this.stepOneForm.controls.country.value,10)
    }
    this.dispatchService.add(dispatch).subscribe(res => {
      this.dispatch.emit(res as Dispatch);
      this.disabledButton = true;
    //  this.stepOneForm.controls.office.disable();
    //  this.stepOneForm.controls.country.disable();
    });
  }
}
