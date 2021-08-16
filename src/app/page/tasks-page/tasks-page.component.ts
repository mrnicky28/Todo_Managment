import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/interfaces/interfaces';
import { TodoService } from 'src/services/todo.service';


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  todos: Todo[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
  ) { }


  ngOnInit(): void {
    this.loadingTodos()
    this.route.data.subscribe((data) => {
      this.todos = data.todo;
    })
  }

  loadingTodos() {
    this.loading = true;
    this.todoService.loadingTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        console.log(error.message);
        this.error = error.message;
      });
  }

  deleteTodo(id: any) {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(p => p.id !== id);
      })
  }



}


