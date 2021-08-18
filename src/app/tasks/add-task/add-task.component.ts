import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo-interface';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error = '';
  form: FormGroup;
  searchValue: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.todos = data.todo;
    });
    console.log(this.route.data);

    this.form = this.FormBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/[A-Z]\b/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  addTodo() {
    event.preventDefault();
    event.stopPropagation();

    const newPost: Todo = {
      id: this.todos.length + 1,
      title: this.form.value.title,
      description: this.form.value.description,
      completed: false,
    };

    this.todoService.addTodo(newPost);
    this.form.reset();
  }

  loadingTodos() {
    this.loading = true;
    this.todoService.loadingTodos().subscribe(
      (data) => {
        this.todos = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }
}
