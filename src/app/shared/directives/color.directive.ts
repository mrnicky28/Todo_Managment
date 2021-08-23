import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Categories } from '../models/category';

@Directive({
  selector: '[appColor]',
})
export class ColorDirective {
  @Input('category') category: string;
  private color: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseenter') onMouseEnter() {
    switch (this.category) {
      case Categories.GENERAL:
        this.color = '#f8b5ab';
        break;
      case Categories.CATEGORY1:
        this.color = '#e2d2fd';
        break;
      case Categories.CATEGORY2:
        this.color = '#ffbdde';
        break;
      case Categories.CATEGORY3:
        this.color = '#5fffbc';
        break;
      case Categories.CATEGORY4:
        this.color = '#a2ffff';
        break;
    }
    this.setColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor('');
  }

  setColor(color: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      color
    );
  }
}
