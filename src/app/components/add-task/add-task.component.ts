import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/interfaces/interfaces';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  todos: Todo[] = [];
  form: FormGroup | any;

  constructor(
    private todoService: TodoService,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
      this.form = this.FormBuilder.group({
        title: ['', [
          Validators.required,
          Validators.pattern(/[A-Z]\b/),
        ]],
        description: ['', [
          Validators.required,
          Validators.minLength(10),
        ]],
      })
  }


  submit() {
    console.log('Form submited', this.form);
    const formData = { ...this.form.value }
    console.log('Form data', formData);



    const newPost: Todo = {
      id: this.todos.length + 1,
      title: this.form.value.title,
      body: this.form.value.description,
    }

    this.todoService.addTodo(newPost)
      .subscribe(todo => {
        this.todos.push(todo);
        console.log(this.todos);
        this.form.reset();

      })

  }
}
