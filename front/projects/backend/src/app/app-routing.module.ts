import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'projects/tools/src/lib/guards/admin.guard';
import { AuthGuard } from 'projects/tools/src/lib/guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { HomeComponent } from './components/posts/home/home.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPostComponent } from './components/user-post/user-post.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostsComponent
          },
          {
            path: 'categories',
            component: CategoryComponent
          },
          {
            path: 'create',
            component: NewPostComponent
          },
          {
            path: 'edit/:slug',
            component: EditPostComponent
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/category/:title',
    component: HomeComponent
  },
  {
    path: 'user-post/:name/:title',
    component: UserPostComponent
  },
  {
    path: 'home/detail/:slug',
    component: SinglePostComponent
  },
  {
    path: 'user-post/:name',
    component: UserPostComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}