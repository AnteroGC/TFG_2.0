import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {noop, Observable} from "rxjs";
import { ApiService } from 'projects/tools/src/lib/api.service';
import {User} from "projects/models/user.interface";
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss']
})
export class HeaderPostComponent implements OnInit {

  
nameSong : string="";
showNameSong: string[] = [""];
  // @ts-ignore
  user:  User = {
    email: '',
    id: -1,
    firstName: '',
    lastName: '',
    profilePic: '',
    roles: ''
  };;
  constructor(private apiService: ApiService,
              private router: Router,
              ) { 
                apiService.$emitterUserLoged.subscribe(() =>{
                  this.ngOnInit()
                })

                apiService.$emitterPlaySong.subscribe((res)=>{
                  
                  this.nameSong = res;
                  this.showNameSong= res.replace("_","/").split('/');
                  
                })

              }

  ngOnInit(): void {
 

    
      this.user = JSON.parse(localStorage.getItem("userLoged")|| '{}')
      console.log(localStorage.getItem("userLoged"))
      console.log(this.user)
    
  }

  logout() {
    
    localStorage.removeItem('userLoged');
    this.apiService.logout().subscribe((res)=>{
      this.user = JSON.parse(localStorage.getItem("userLoged")|| '{}')
      this.router.navigate(['/login']).then();
      console.log(this.user)
    });
    
    console.log(this.user)
  }
}
