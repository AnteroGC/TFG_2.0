
import { Component, EventEmitter, OnInit, Output, Input  } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "projects/models/category.interface";
import {ApiService} from "projects/tools/src/lib/api.service";
import { User } from 'projects/models/user.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

 
  // @ts-ignore
  category: Observable<Category[]>;
  @Input() viewUser! : any ;
  @Output() selectCategory = new EventEmitter<string>();
  user: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.category = this.apiService.getAllCategory();
    this.category.subscribe(res => console.log(res))
    this.viewUser.subscribe((res: any)=>{
      this.user = res;
    })
  }

}

function input() {
  throw new Error('Function not implemented.');
}
