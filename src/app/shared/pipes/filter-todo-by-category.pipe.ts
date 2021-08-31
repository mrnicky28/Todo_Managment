import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTodoByCategory'
})
export class FilterTodoByCategoryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
