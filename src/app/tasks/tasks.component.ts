import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from 'src/app/shared/models/todo-interface';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class TasksPageComponent implements OnInit {
  ngUnsubscribe = new Subject<string>();
  todos: Todo[] = [];
  loading = false;
  error = '';
  searchValue: string;
  form: FormGroup;
  constructor(
    private todoService: TodoService,
    private parentForm: FormGroupDirective
  ) {}

  ngOnInit(): void {
    // this.parentForm.form.addControl('second-address', this.form);
    this.todoService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((todos) => (this.todos = todos));
    this.todoService.searchTerm$.subscribe(
      (searchTerm: string) => (this.searchValue = searchTerm)
    );
  }

  deleteTodo(id: any) {
    event.preventDefault();
    event.stopPropagation();

    this.todoService.deleteTodo(id);
  }
  completeTodo(id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.todoService.completeTodo(id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
