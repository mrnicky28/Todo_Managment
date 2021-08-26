import { Todo } from 'src/app/shared/models/todo-interface';
import { takeUntil } from 'rxjs/operators';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Observable, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  todos$: Observable<Todo[]>;

  loading = false;
  error = '';
  searchValue$: Observable<string>;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe$));

    this.searchValue$ = this.todoService.searchTerm$.pipe(
      takeUntil(this.ngUnsubscribe$)
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
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
