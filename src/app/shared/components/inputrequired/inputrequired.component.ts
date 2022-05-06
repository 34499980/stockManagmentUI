import { Component, OnInit, Input, Output,EventEmitter, ViewChild, ElementRef, Optional, Self, Renderer2 } from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgControl, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { pipe } from 'rxjs';



@Component({
  selector: 'app-inputrequired',
  templateUrl: './inputrequired.component.html',
  styleUrls: ['./inputrequired.component.css']
})
export class InputrequiredComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() title: string;
  @Input() type: string;
  @ViewChild('input') input: ElementRef;

  value = '';
  onChange = (x) => {};
  onTouched = (x) => {};
  constructor(@Self()
  @Optional()
  public ngControl: NgControl,
  private renderer: Renderer2) {
if (this.ngControl) {
this.ngControl.valueAccessor = this;
}
}
  ngOnInit(): void {
  }

  writeValue(obj): void {
    this.value = obj;
  }
  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
  ValidateEmail(value: any){
    return !(value.indexOf('@') > -1 && value.indexOf('.com') > -1);
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }
}


