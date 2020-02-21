import { Directive, HostListener, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, NG_ASYNC_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[focusInvalidInput]',
  providers: [{  provide: NG_ASYNC_VALIDATORS, useExisting: FormDirective, multi: true }]
})
export class FormDirective {

  constructor(private el: ElementRef) { }

  
  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.focus();  
    }
  }
}
