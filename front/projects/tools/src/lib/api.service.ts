import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "projects/models/post.interface";
import {Category} from "projects/models/category.interface";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "projects/models/user.interface";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:5000';
  $emitterUserLoged = new EventEmitter();
  $emitterPlaySong = new EventEmitter<string>();
  private authState$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private user: User = {
    email: '',
    id: -1,
    firstName: '',
    lastName: '',
    profilePic: '',
    roles: ''
  };
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient,
              private router: Router) {


  }
  

  emitirEventoUserLoged() {
    console.log('emito')
      this.$emitterUserLoged.emit();
  }   

  emitirEventoPlaySong(song : string) {
    this.$emitterPlaySong.emit(song);
}   


  getAuthState(): Observable<any> {
    
     this.http.get<{ status: boolean, user: User }>(`${this.URL}/auth/authstatus`, {withCredentials: true}).subscribe((res)=>{
      console.log(res)
      this.authState$.next(res.status)
      this.user$.next(res.user)
      this.emitirEventoUserLoged()
    })
    return this.authState$
  }

  getUserObservable() {
    return this.user$.asObservable();
  }

  getAllPosts(): Observable<Post[]> {
    const user: User = JSON.parse(localStorage.getItem("userLoged")|| '{}')
    if(user && !!user.id && user.id>0 && user.roles != 'Admin'){
      
      return this.http.get<Post[]>(`${this.URL}/post?id=${user.id}`);
       
    }
    return this.http.get<Post[]>(`${this.URL}/post`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

  createCategory(tittle: string, description: string) {
    return this.http.post<Category>(`${this.URL}/category`, {tittle, description}, {
      withCredentials: true
    })
  }

  getPostBySlug(slug: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/post/slug/${slug}`);
  }

  getPostByUser(id: number | undefined): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/post/user/${id}`);
  }

  getUsersFollow(user: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/user-follower/${user}`);
  }
  getFollowers(user: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/user-follower/followers/${user}`);
  }
  getUserFollow(userLoged: number | undefined, userSearch: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/user-follower/${userLoged}/${userSearch}`);
  }

  createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/post`, formData, {
      withCredentials: true
    });
  }

  updatePost(slug:string, postData: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.URL}/post/${slug}`, postData, {
      withCredentials: true
    });
  }
  createFollowers(formData: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/user-follower`, formData, {
      withCredentials: true
    });
  }

  uploadFile(form: FormData) {
    return this.http.post(`${this.URL}/post/upload-photo`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }

  login(email: string, password: string) {
    console.log('hola')
    return this.http.post<any>(`${this.URL}/auth/login`, {email, password}, {
      withCredentials: true
    }).pipe(
      tap(value => {
        console.log('hola2')
        if (value.success) {

          this.authState$.next(true);
          this.user$.next(value.user)
          
        } else {
          console.log('entro')
          this.authState$.next(false);
        }
      })
    );
  }

  /*registration*/
  registerUser(userData: User): Observable<User> {
    console.log(userData)
    return this.http.post<User>(`${this.URL}/auth/register`, userData, {
      withCredentials: true
    });
  }

  /*logout*/
  logout() {
    return this.http.post<{ success: boolean }>(`${this.URL}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(res => {
        console.log('me desdolego')
        this.user$.next({
          email: '',
          id: -1,
          firstName: '',
          lastName: '',
          profilePic: '',
          roles: ''
        })
        localStorage.removeItem('userLoged');
        this.authState$.next(false);
        
      })
    );
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(name: string | null): Observable<User> {
    return this.http.get<User>(`${this.URL}/auth/name/${name}`);
 
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/auth/name`);
 
  }

  updateCategory(id: number, title: string, description: string) {
    return this.http.patch<Category>(`${this.URL}/category/${id}`, {title, description}, {
      withCredentials: true
    })
  }

  removeCategory(id: number) {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/category/${id}`, {
      withCredentials: true
    });
  }

  removePost(id: number) {
    return this.http.delete<{success: boolean, post: Post}>(`${this.URL}/post/${id}`, {withCredentials: true});
  }

  removeFollowers(userLoged: number | undefined, userSearch: number | undefined) {
    return this.http.delete<{success: boolean, users: any}>(`${this.URL}/user-follower/${userLoged}/${userSearch}`, {withCredentials: true});
  }
}