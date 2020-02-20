import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostListener('click') toggleOpen() {
    const nextEl = this.renderer.nextSibling(this.elementRef.nativeElement);
    nextEl.classList.toggle('show');
  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
}
