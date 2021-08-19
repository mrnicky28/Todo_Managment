import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from 'src/app/shared/models/todo-interface';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
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
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        console.log(params);
        if (params.id) {
          this.editMode = true;

          this.todoData = this.todoService.getTodoByID(+params.id);
          console.log(this.todoData);
        }
      });

    const { title, description } = this.todoData;

    this.form = this.FormBuilder.group({
      title: [
        this.editMode ? title : '',
        [Validators.required, Validators.pattern(/[A-Z]\b/)],
      ],
      description: [
        this.editMode ? description : '',
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.editMode) {
      this.addTodo();
    } else {
      this.updateTodo();
    }
  }

  addTodo() {
    const formData = this.form.getRawValue();

    const newTodo: Todo = {
      ...formData,
      completed: false,
    };

    this.todoService.addTodo(newTodo);

    this.form.reset();

    console.log(this.editMode);
  }

  updateTodo() {
    const formData = this.form.getRawValue();

    this.todoService.updateTodo({
      ...this.todoData,
      ...formData,
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
