import { FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTaskComponent implements OnInit {
  private searchTerms$ = new Subject<string>();
  private ngUnsubscribe$ = new Subject<void>();
  searchValue = new FormControl();
  public inputValue: string;

  constructor(
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public search(): void {
    console.log(this.inputValue);
  }

  ngOnInit(): void {
    this.searchTerms$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        distinctUntilChanged(),
        debounceTime(600)
      )

      .subscribe((term) => {
        this.todoService.setSearchTerm(term);
        this.changeDetectorRef.markForCheck();
      });

    this.searchValue.valueChanges.subscribe((value) => {
      this.searchTerms$.next(value);
    });
    this.searchValue.setValue('');
  }

  onDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
