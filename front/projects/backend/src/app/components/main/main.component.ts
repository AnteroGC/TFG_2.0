import { Component, OnInit } from '@angular/core';
import { User } from 'projects/models/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user:  User = {
    email: '',
    id: -1,
    firstName: '',
    lastName: '',
    profilePic: '',
    roles: ''
  };;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userLoged")|| '{}')
    console.log(this.user.roles)
  }

}
