import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/tasks.module').then((m) => m.TasksModule),
      },
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      {
        path: 'task/edit/:id',
        component: EditTaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'tasks/category/:id',
        component: CategoryComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
