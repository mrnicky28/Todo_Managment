import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ColorDirective } from './shared/directives/color.directive';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TasksPageComponent } from './tasks/tasks.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SearchTaskComponent } from './tasks/search-task/search-task.component';
import { CategoryPageComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { GetTitlePipe } from './shared/pipes/get-title-category.pipe';
import { DebounceDirective } from './shared/directives/debounce.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    ColorDirective,
    EditTaskComponent,
    NotFoundComponent,
    TasksPageComponent,
    MainLayoutComponent,
    SearchTaskComponent,
    CategoryPageComponent,
    CategoryComponent,
    GetTitlePipe,
    DebounceDirective,
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],

  providers: [AuthGuard, FormGroupDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
