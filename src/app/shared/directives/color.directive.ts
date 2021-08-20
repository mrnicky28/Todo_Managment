import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appColor]',
})
export class ColorDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }
  @Input('appColor') color;

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor('');
  }

  private setColor(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', val);
  }
}
