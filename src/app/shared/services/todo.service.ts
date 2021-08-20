import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    this.todos$.next([
      ...this.todos$.value,
      {
        id: this.todos$.value?.length + 2,
        ...todo,
      },
    ]);
    console.log('todos', this.todos$);
  }

  deleteTodo(id: number): void {
    this.todos$.next(this.todos$.value.filter((todo) => todo.id !== id));
  }

  updateTodo(todo: Todo): void {
    this.todos$.next(
      this.todos$.value.map((todoItem) =>
        todoItem.id === todo.id ? { ...todoItem, ...todo } : todoItem
      )
    );
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$.asObservable().pipe(
      switchMap((todos) => {
        if (todos?.length) {
          return of(todos);
        }

        return this.loadingTodos();
      })
    );
  }

  getTodoByID(todoId: number): Todo {
    return this.todos$.value.find(({ id }) => id === todoId);
  }

  loadingTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos?_limit=10`).pipe(
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

  setSeacrhCategory() {}

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
