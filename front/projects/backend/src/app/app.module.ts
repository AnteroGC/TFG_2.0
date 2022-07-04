import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { AllPostComponent } from './components/posts/all-post/all-post.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule,  ReactiveFormsModule,} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {EditorModule} from "@tinymce/tinymce-angular";
import{MessageService, SharedModule} from "primeng/api";
import { HomeComponent } from './components/posts/home/home.component';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';
import { CategoryListComponent } from './components/posts/category-list/category-list.component';
import { HeaderPostComponent } from './components/posts/header-post/header-post.component';
import { FooterPostComponent } from './components/posts/footer-post/footer-post.component';
import { UserPostComponent } from './components/user-post/user-post.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import { SearchFilterComponent } from './components/posts/search-filter/search-filter.component';
import { AuthGuard } from 'projects/tools/src/lib/guards/auth.guard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list'
import { MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PostsComponent,
    EditPostComponent,
    NewPostComponent,
    AllPostComponent,
    CategoryComponent,
    HomeComponent,
    SinglePostComponent,
    CategoryListComponent,
    HeaderPostComponent,
    FooterPostComponent,
    UserPostComponent,
    SearchFilterComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ProgressBarModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    EditorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule

  ],
  providers: [
    MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
