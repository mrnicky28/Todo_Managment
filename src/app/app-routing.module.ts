import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { TodoResolver } from './todo.resolver';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TasksPageComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      { path: 'auth', component: AuthPageComponent },
      {
        path: 'tasks',
        component: TasksPageComponent,
        canActivate: [AuthGuard],
        resolve: {
          todo: TodoResolver,
        },
      },
      {
        path: 'task/edit/:id',
        component: AddTaskComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
