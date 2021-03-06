import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from 'src/app/shared/models/todo-interface';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksPageComponent implements OnInit {
  ngUnsubscribe = new Subject<string>();
  todos: Todo[] = [];
  loading = false;
  error = '';
  searchValue: string;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.todoService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((todos) => {
        this.todos = todos;
        console.log(todos);
      });

    this.todoService.searchTerm$.subscribe(
      (searchTerm: string) => (this.searchValue = searchTerm)
    );
  }

  deleteTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todoService.deleteTodo(id);
  }

  completeTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todoService.completeTodo(id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
