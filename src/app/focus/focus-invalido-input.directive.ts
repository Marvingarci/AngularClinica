import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focusInvalidoInput]'
})
export class FocusInvalidoInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('submint')
  onFormSubmit(){
    const invalidControl = this.el.nativeElement.queryselector
    ('.ng-invalid');

    if(invalidControl){
      invalidControl.focus();
    }
  }


}
