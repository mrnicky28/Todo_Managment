import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth/auth.component';
import { CategoryPageComponent } from './category/category.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/services/auth.service';
import { TasksPageComponent } from './tasks/tasks.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SearchTaskComponent } from './tasks/search-task/search-task.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { TodoResolver } from './todo.resolver';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    CategoryPageComponent,
    MainLayoutComponent,
    TasksPageComponent,
    AddTaskComponent,
    SearchTaskComponent,
    NotFoundComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService, AuthGuard, TodoResolver, FormGroupDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
