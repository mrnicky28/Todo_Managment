import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TasksPageComponent } from './tasks/tasks.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      { path: 'auth', component: AuthComponent },
      {
        path: 'tasks',
        component: TasksPageComponent,
        canActivate: [AuthGuard],
      },
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
