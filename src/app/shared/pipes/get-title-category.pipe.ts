import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Pipe({
  name: 'getTitleCategory',
})
export class GetTitlePipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  transform(categoryId): string {
    const category = this.categoryService.categories.find(
      (category) => category.id === categoryId
    );

    return category?.title ?? '';
  }
}
