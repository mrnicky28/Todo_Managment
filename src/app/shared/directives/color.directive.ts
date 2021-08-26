import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Categories } from '../models/category';
import { CategoryService } from '../services/category.service';

@Directive({
  selector: '[appColor]',
})
export class ColorDirective {
  @Input('appColor') categoryId: number;
  private color: string;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private categoryService: CategoryService
  ) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setCategoryColor();
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

  private setCategoryColor() {
    const category = this.categoryService.categories.find(
      (category) => category.id === this.categoryId
    );

    if (!category) {
      return;
    }

    switch (category.title) {
      case Categories.GENERAL:
        this.color = '#f8b5ab';
        break;
      case Categories.IMPORTANT:
        this.color = '#e2d2fd';
        break;
      case Categories.PLANNED:
        this.color = '#ffbdde';
        break;
      case Categories.WORK:
        this.color = '#5fffbc';
        break;
      case Categories.EDUCATION:
        this.color = '#a2ffff';
        break;
    }
    this.setColor(this.color);
  }
}
