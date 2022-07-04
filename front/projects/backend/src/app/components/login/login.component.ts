import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ApiService} from "projects/tools/src/lib/api.service";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from 'projects/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  observer$!: Observable<any>; 

  user : Partial<User> | undefined

  constructor(private renderer: Renderer2,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private message: MessageService,
              private router: Router,) {
  }



  ngOnInit(): void {

  
  }

  userLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const loginData = {
      email: form.value.email,
      password: form.value.password
    }
    this.apiService.login(loginData.email, loginData.password).subscribe({
      next: (res) => {
            console.log(res)
            if((res.user.roles === 'Admin' ||res.user.roles === 'Reader' || res.user.roles === 'NoRegister')   && res.success) {
            this.message.add({
             severity:"info",
            summary: 'Success',
          detail: 'Authentication Successful',
          life: 1500
        })
        setTimeout(() => {
          console.log('navego')
          this.apiService.emitirEventoUserLoged()
          this.router.navigate(['']).then(); 
        }, 1500)
      } else {
        console.log('entranding')
        this.message.add({
          severity: "error",
          summary: `Failure Attempt`,
          detail: 'You are not authorised to view this page',
          life: 3000
        })
      }
      },
      error: (e) => {        this.message.add({
        severity: "error",
        summary: `Failure Attempt`,
        detail: 'You are not authorised to view this page',
        life: 3000
      })},
      complete: () => console.info('complete') 
  })
    console.log(loginData.password)

    // this.apiService.login(loginData.email, loginData.password).subscribe(res => {
    //   if(res.user.roles === 'Admin' && res.success) {
    //     this.message.add({
    //       severity:"info",
    //       summary: 'Success',
    //       detail: 'Authentication Successful',
    //       life: 1500
    //     })
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/').then();
    //     }, 1500)
    //   } else {
    //     this.message.add({
    //       severity: "error",
    //       summary: `Failure Attempt`,
    //       detail: 'You are not authorised to view this page',
    //       life: 3000
    //     })
    //   }

    // }, (err: HttpErrorResponse) => {
    //   console.log(err.statusText);
    //     this.message.add({
    //       severity: "error",
    //       summary: `Failure ${err.status}`,
    //       detail: err.statusText,
    //       life: 1500
    //     })
    //     // this.router.navigateByUrl('/login').then();

    // })
  }
}