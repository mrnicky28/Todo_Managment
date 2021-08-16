import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Todo } from 'src/interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private http: HttpClient) {}


  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      'https://jsonplaceholder.typicode.com/todos',
      todo
    );
  }

  loadingTodos(): Observable<Todo[]> {

    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .pipe(
        catchError(error => {
          console.log('Error', error.message);
          return throwError(error);
        })
      );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos/?name=${term}`)
    .pipe(
      map( (todos) => {
        return todos.filter(
          (todo) => todo.title.toLowerCase().indexOf(term.toLowerCase()) > -1
        );
      })
    );
  }
}
