
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Post} from "projects/models/post.interface";
import {Observable, Subscription, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import { User } from 'projects/models/user.interface';
import { FormControl} from '@angular/forms';
import { startWith } from 'rxjs/operators'

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  subs: Subscription[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<User[]> | undefined;
  searchUser!: User[];
  userloged: User = JSON.parse(localStorage.getItem("userLoged")|| '{}');
  
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    
    
    this.subs.push(this.route.paramMap.subscribe(params => {

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
     
      this.apiService.getAllUser().subscribe((res)=>{
        this.searchUser=res;
      })
    }));
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
  
    if(!filterValue || !this.searchUser){
      return []
    }
    return this.searchUser.filter((user)=>{
      if(!!this.userloged && (user.firstName == 'Admin' || user.firstName == this.userloged.firstName))
        return false
      return user.firstName.toLowerCase().includes(filterValue)
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

}
