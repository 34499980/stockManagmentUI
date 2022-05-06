import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[onlyNumbers]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onnKeyDown(event) {
      const e  = <KeyboardEvent> event;
   if([46,8,9,27,13].indexOf(event.keyCode) !== -1 ||
    (e.keyCode == 65 && e.ctrlKey == true) ||
    (e.keyCode == 67 && e.ctrlKey == true) ||
    (e.keyCode == 88 && e.ctrlKey == true) ||
    (e.keyCode >= 35 && e.keyCode <= 39)){
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)){
        e.preventDefault();
    }
  }

}