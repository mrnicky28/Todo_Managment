import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent {
  constructor(private categoryService: CategoryService) {}

  categories = this.categoryService.categories;
}
