import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo-interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], searchValue: string = ''): Todo[] {
    console.log(searchValue);

    if (!searchValue) {
      return todos;
    }
    const a = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(a);

    return a;
  }
}
