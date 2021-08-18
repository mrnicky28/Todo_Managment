import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { delay } from 'rxjs/operators';
import { Todo } from './shared/models/todo-interface';

import { TodoService } from './shared/services/todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoResolver implements Resolve<Todo> {
  constructor(private todoService: TodoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Todo | Observable<any> | Promise<any> {
    return this.todoService.loadingTodos().pipe(delay(1000));
  }
}
