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
  editMode = false;
  todoData: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params.id) {
        this.editMode = true;

        this.todoData = this.todoService.getTodoByID(+params.id);
        console.log(this.todoData);
      }
    });

    this.form = this.FormBuilder.group({
      title: [
        this.editMode ? this.todoData.title : '',
        [Validators.required, Validators.pattern(/[A-Z]\b/)],
      ],
      description: [
        this.editMode ? this.todoData.description : '',
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  onSubmit() {
    event.preventDefault();
    event.stopPropagation();

    // const newTodo: Todo = {
    //   id: this.todos.length + 1,
    //   title: this.form.value.title,
    //   description: this.form.value.description,
    //   completed: false,
    // };

    // this.todoService.addTodo(newTodo);
    // this.form.reset();

    console.log(this.editMode);
  }

  updateTodo() {
    event.preventDefault();
    event.stopPropagation();

    this.todoService.updateTodo({
      id: this.todos.length + 1,
      title: this.form.value.title,
      description: this.form.value.description,
    });
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
