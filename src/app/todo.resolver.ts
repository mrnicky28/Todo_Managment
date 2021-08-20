import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Todo } from './shared/models/todo-interface';

import { TodoService } from './shared/services/todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoResolver implements Resolve<Todo[]> {
  constructor(private todoService: TodoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[]> {
    return this.todoService.getTodos().pipe(
      switchMap((todos) => {
        console.log(todos);
        if (todos?.length) {
          return of(todos);
        }

        return this.todoService.loadingTodos();
      })
    );
  }
}
