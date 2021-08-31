import { Injectable } from '@angular/core';
import { Categories, Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [
    {
      id: 1,
      title: Categories.GENERAL,
      color: '#FFF',
    },
    {
      id: 2,
      title: Categories.IMPORTANT,
      color: '#FFF',
    },
    {
      id: 3,
      title: Categories.PLANNED,
      color: '#FFF',
    },
    {
      id: 4,
      title: Categories.WORK,
      color: '#FFF',
    },
    {
      id: 5,
      title: Categories.EDUCATION,
      color: '#FFF',
    },
  ];
}
