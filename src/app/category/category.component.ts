import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../shared/models/todo-interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories = this.categoryService.categories;
  todos$: Observable<Todo[]> | any;

  ngOnInit() {
    this.categoryService.getTodosByCategoryId(this.categories[1].id);
  }
}
