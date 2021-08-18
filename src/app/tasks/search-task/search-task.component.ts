import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Todo } from 'src/app/shared/models/todo-interface';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss'],
})
export class SearchTaskComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  private searchTerms = new Subject<string>();
  ngUnsubscribe = new Subject<string>();
  searchValue = new FormControl();

  constructor(
    private todoService: TodoService,
    private fornBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((term) => this.todoService.setSearchTerm(term));

    this.searchValue.valueChanges.subscribe((value) => {
      this.searchTerms.next(value);
    });
  }
}
