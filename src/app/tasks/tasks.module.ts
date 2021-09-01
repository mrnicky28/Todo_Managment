import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks.component';
import { CategoryPageComponent } from '../category-list/category-list.component';
import { CategoryComponent } from '../category/category.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ColorDirective } from '../shared/directives/color.directive';
import { DebounceDirective } from '../shared/directives/debounce.directive';
import { GetTitlePipe } from '../shared/pipes/get-title-category.pipe';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { TasksRoutingModule } from './tasks-routing.module';
import { AuthGuard } from '../auth.guard';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    FilterPipe,
    TasksPageComponent,
    ColorDirective,
    EditTaskComponent,
    NotFoundComponent,
    SearchTaskComponent,
    CategoryPageComponent,
    CategoryComponent,
    GetTitlePipe,
    DebounceDirective,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [AuthGuard],
})
export class TasksModule {}
