import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './page/auth-page/auth-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TaskEditPageComponent } from './page/task-edit-page/task-edit-page.component';
import { TasksPageComponent } from './page/tasks-page/tasks-page.component';
import { AuthGuard } from 'src/services/auth.guard';
import { NotFoundComponent } from './page/not-found/not-found.component';




const routes: Routes = [
  {path: '', component: MainLayoutComponent, children:[
    {path: '', redirectTo:'/auth', pathMatch:'full'},
    {path: 'auth', component: AuthPageComponent},
    {path: 'tasks', component: TasksPageComponent, canActivate: [AuthGuard]},
    {path: 'task/edit/:id', component: TaskEditPageComponent, canActivate: [AuthGuard]}
  ]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
