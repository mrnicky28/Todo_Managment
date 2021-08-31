import { Todo } from 'src/app/shared/models/todo-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TodoService } from 'src/app/shared/services/todo.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  categories = this.categoryService.categories;
  loading = false;
  error = '';
  form: FormGroup;
  editMode = false;
  todoData: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {} //null injector di decorator skipSelf optional self host ng-tamplate ng-container

  ngOnInit(): void {
    console.log('categories', this.categories);

    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        if (params.id) {
          this.editMode = true;
          this.todoData = this.todoService.getTodoByID(+params.id);
        }
      });

    this.form = this.FormBuilder.group({
      title: [
        this.editMode ? this.todoData.title : '',
        [Validators.required, Validators.pattern(/[a-z]\b/)],
      ],
      description: [
        this.editMode ? this.todoData.description : '',
        [Validators.required, Validators.minLength(10)],
      ],
      categoryId: [
        this.editMode ? this.todoData.categoryId : null,
        [Validators.required],
      ],
    });

    this.form.statusChanges.subscribe((status) => {
      console.log(status);
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

  addTodo() {
    const formData = this.form.getRawValue();

    const newTodo: Todo = {
      ...formData,
      completed: false,
    };
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
