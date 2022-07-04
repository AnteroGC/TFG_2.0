import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Post} from "projects/models/post.interface";
import {BehaviorSubject, Observable, Subscription, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import { User } from 'projects/models/user.interface';
import { FormControl} from '@angular/forms';
import { startWith } from 'rxjs/operators'

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

// @ts-ignore
posts$: Observable<Post[]> = [];
viewUser:  User = {
  email: '',
  id: -1,
  firstName: '',
  lastName: '',
  profilePic: '',
  roles: ''
};

subs: Subscription[] = [];
myControl = new FormControl('');
filteredOptions = new BehaviorSubject<User>(this.viewUser);
  userLoged!: User;

isFollow : any[] =[]
followers: any[] | undefined
following: any[] | undefined;
constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
  this.userLoged=JSON.parse(localStorage.getItem("userLoged")|| '{}') ? JSON.parse(localStorage.getItem("userLoged")|| '{}') : {
    email: '',
    id: -1,
    firstName: '',
    lastName: '',
    profilePic: '',
    roles: ''
  };
}

ngOnInit(): void {

  



  this.route.paramMap.subscribe(params => {
    const catTitle = params.get('title');
    const userName = params.get('name')
    if (this.router.url === `/user-post/${userName}/${catTitle}`) {
      this.apiService.getUser(userName).subscribe((user)=>{
        
        this.viewUser = user;
        this.filteredOptions.next(this.viewUser)
        this.apiService.getUserFollow(this.userLoged.id, this.viewUser.id).subscribe((res)=>{
          this.isFollow = res;
        })
        this.apiService.getUsersFollow(this.userLoged.id).subscribe((res)=>{
          this.followers = res;
          
        })
        
      this.apiService.getFollowers(this.userLoged.id).subscribe((res)=>{
        this.following = res;
        
      })
      

      })

      
      this.posts$ = this.apiService.getPostByUser(this.viewUser.id).pipe(

        map(posts => posts.filter(p => p.user.firstName === userName && p.category.tittle === catTitle))
      );



    } else {

      this.apiService.getUser(userName).subscribe((user)=>{
        this.viewUser = user;
        this.filteredOptions.next(this.viewUser)
        this.apiService.getUserFollow(this.userLoged.id, this.viewUser.id).subscribe((res)=>{
          this.isFollow = res;
        })
        this.posts$ = this.apiService.getPostByUser(this.viewUser.id).pipe(

          map(posts => posts.filter(p => p.user.firstName === userName))
        );
      })
      this.apiService.getUsersFollow(this.userLoged.id).subscribe((res)=>{
        this.followers = res;
        
      })

      this.apiService.getFollowers(this.userLoged.id).subscribe((res)=>{
        this.following = res;
        
      })

      this.posts$ = this.apiService.getPostByUser(this.viewUser.id).pipe(

        map(posts => posts.filter(p => p.user.firstName === userName))
      );
      
    

      
    }
    
  });
}

follow(): void{
  this.apiService.createFollowers({following_id:this.userLoged.id, follower_id:this.viewUser}).subscribe((res)=>{
    this.apiService.getUserFollow(this.userLoged.id, this.viewUser.id).subscribe((res)=>{
      this.isFollow = res;
    })
  })
}

unFollow(): void{
  this.apiService.removeFollowers(this.userLoged.id, this.viewUser.id).subscribe((res)=>{
    this.apiService.getUserFollow(this.userLoged.id, this.viewUser.id).subscribe((res)=>{
      this.isFollow = res;
    })
  })
}
goTo(event: any){
  console.log(event)
  console.log(event.option.value)
  setTimeout(() => {
    console.log('navego')
    this.router.navigate(['/user-post/' + event.option.value]).then(); 
  }, 1500)
}

playSong(song:string) {
  console.log(song)
  this.apiService.emitirEventoPlaySong(song) ;
} 

ngOnDestroy() {
  this.subs.map(s => s.unsubscribe());
}
}
