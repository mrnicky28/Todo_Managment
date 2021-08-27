import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TasksPageComponent } from './tasks/tasks.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CategoryComponent } from './category/category.component';
import { AuthComponent } from './auth/auth.component';

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
        path: 'category/:id',
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
