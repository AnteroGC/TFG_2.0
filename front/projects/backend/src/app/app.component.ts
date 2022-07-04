import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';
  constructor(private apiService: ApiService
    ) { 
      console.log('lo creo')
      localStorage.removeItem('userLoged');
      this.write_localstorage()
    }




  write_localstorage(){
    this.apiService.getUserObservable().subscribe((user)=>{
      console.log('estoy en el storage')
      console.log(user)
      localStorage.setItem("userLoged", JSON.stringify(user))
   });
    
  }
}
