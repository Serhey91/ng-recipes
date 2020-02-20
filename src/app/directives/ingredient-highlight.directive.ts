import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class IngridientHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'rgb(205, 100, 155)';
  // for events
  @HostListener('mouseenter') mouseOver(eventData: Event) {
    this.setHoverStyles();
  }
  @HostListener('mouseleave') mouseOut(eventData: Event) {
    this.setBaseStyles();
  }
  // For props
  @HostBinding('style.background') background: string;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.background = this.defaultColor;
    // base highliting
    // this.elementRef.nativeElement.style.backgroundColor = 'rgb(205, 100, 155)';
    // this.elementRef.nativeElement.style.color = 'white';

    // advanced
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'rgb(205, 100, 155)');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white')
  }

  setHoverStyles() {
    this.background = this.highlightColor;
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }

  setBaseStyles() {
    this.background = this.defaultColor;
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }
}
