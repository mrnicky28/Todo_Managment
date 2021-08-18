import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Categories } from '../models/category';
import { Todo } from '../models/todo-interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$ = new BehaviorSubject<Todo[]>([]); //доступ из компонентов и сервисов мы не емеем
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): void {
    this.todos$.next([...this.todos$.value, todo]);
  }

  deleteTodo(id: number): void {
    this.todos$.next(this.todos$.value.filter((todo) => todo.id !== id));
  }

  getTodos(): BehaviorSubject<Todo[]> {
    return this.todos$;
  }

  loadingTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .pipe(
        tap((data) => {
          this.todos$.next(this.transformData(data));
        }),
        catchError((error) => {
          console.log('Error', error.message);
          return throwError(error);
        })
      );
  }

  completeTodo(id: number): void {
    const result = this.todos$.value.reduce((acc: Todo[], val: Todo) => {
      if (val.id === id) {
        val.completed = !val.completed;
      }
      return [...acc, val];
    }, []);
    this.todos$.next(result);
  }
  setSearchTerm(term: string): void {
    this.searchTerm$.next(term.trim());
  }

  transformData(data: Todo[]): Todo[] {
    return data.map((value: Todo) => {
      return {
        ...value,
        description: '',
        category: Categories.GENERAL,
      };
    });
  }
}
