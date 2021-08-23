import { Todo } from 'src/app/shared/models/todo-interface';
import { takeUntil } from 'rxjs/operators';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Observable, Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

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
  searchValue: string;
  constructor(
    private todoService: TodoService,
    private changeDetectirRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todoService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe$));
    this.changeDetectirRef.detectChanges();

    this.todoService.searchTerm$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((searchTerm: string) => {
        this.searchValue = searchTerm;
        this.changeDetectirRef.detectChanges();
      });
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
