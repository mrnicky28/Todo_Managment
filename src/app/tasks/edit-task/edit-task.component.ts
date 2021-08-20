import { Todo } from 'src/app/shared/models/todo-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TodoService } from 'src/app/shared/services/todo.service';
import { Categories } from 'src/app/shared/models/category';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  loading = false;
  error = '';
  form: FormGroup;
  searchValue: string;
  editMode = false;
  todoData: Todo;

  categories = [
    'General',
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private FormBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        console.log(params);
        if (params.id) {
          this.editMode = true;

          this.todoData = this.todoService.getTodoByID(+params.id);
          console.log('todoData', this.todoData);
        }
      });

    const { title, description, category } = this.todoData ?? {};

    this.form = this.FormBuilder.group({
      title: [
        this.editMode ? title : '',
        [Validators.required, Validators.pattern(/[a-z]\b/)],
      ],
      description: [
        this.editMode ? description : '',
        [Validators.required, Validators.minLength(10)],
      ],
      category: [this.editMode ? category : '', [Validators.required]],
    });
  }

  changeCategory(e) {
    this.category.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get category() {
    return this.form.get('category');
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

  selectedOption() {}

  addTodo() {
    const formData = this.form.getRawValue();

    const newTodo: Todo = {
      ...formData,
      completed: false,
    };
    console.log(this.categories);

    console.log('NEW TODO', newTodo);

    this.todoService.addTodo(newTodo);

    this.form.reset();
  }

  updateTodo() {
    const formData = this.form.getRawValue();

    this.todoService.updateTodo({
      ...this.todoData,
      ...formData,
    });

    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
