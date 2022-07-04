import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Post} from "projects/models/post.interface";
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("userLoged")|| '{}')
  posts: Post[] = [];
  // @ts-ignore
  @ViewChild('dt1', {static: false}) dt1: Table;
  // @ts-ignore
  @ViewChild('search') search: HTMLInputElement;

  loading: boolean = true;

  constructor(private apiService: ApiService,
              private message: MessageService) {
  }

  ngOnInit(): void {
    if(this.user.firstName=='Adming'){
      this.apiService.getAllPosts().subscribe((posts) => {
        this.posts = posts;
        console.log(posts)
        this.loading = false;
        
      });
    }
    else{
      this.apiService.getPostByUser(this.user.id).subscribe((res) =>{
        this.posts = res;
      });
  
    }



  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    this.dt1.filterGlobal(ev.target.value, 'contains');
  }

  removePost(id: number) {
    this.apiService.removePost(id).subscribe(res => {
      if (res.success) {
        this.posts = this.posts.filter(p => p.id !== id);
        this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Post removed',
          life: 1500
        })
      }
    });
  }
}