import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './page/auth-page/auth-page.component';
import { CategoryPageComponent } from './page/category-page/category-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TaskEditPageComponent } from './page/task-edit-page/task-edit-page.component';
import { TasksPageComponent } from './page/tasks-page/tasks-page.component';
import { TaskComponent } from './components/task/task.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/services/auth.guard';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { SearchTaskComponent } from './components/search-task/search-task.component';
import { NotFoundComponent } from './page/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    CategoryPageComponent,
    MainLayoutComponent,
    TaskEditPageComponent,
    TasksPageComponent,
    TaskComponent,
    AddTaskComponent,
    SearchTaskComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
