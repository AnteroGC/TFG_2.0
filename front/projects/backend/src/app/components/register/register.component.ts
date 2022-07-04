import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imgUrl: any = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private router: Router)  { }

  ngOnInit(): void {
  }

  preview(ev: any) {
    if (ev.target.files.length === 0) {
      this.imgUrl = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
      this.mainImagePath = this.imgUrl;
      return;
    }
    const reader = new FileReader();
    this.imagePath = ev.target.files;
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;
    }
    this.altText = ev.target.files[0].name;

    const file: File = ev.target.files[0];

    if (file) {
      this.showProgress = true;
      this.uploadProgress = 0;
      this.filename = file.name;
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      const upload$ = this.apiService.uploadFile(formData);

      this.uploadSub = upload$.subscribe((event) => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          if (this.uploadProgress === 100) {
            this.messageService.add({
              severity: 'info', summary: 'Success',
              detail: 'File Uploaded', life: 2000
            })
          }
        }
        if (event instanceof HttpResponse) {
          const response: any = event.body;
          this.mainImagePath = response.filePath;
        }
        setTimeout(()=> this.showProgress = false , 2000)
      })

    }
  }

  createPost(myForm: NgForm) {
    
    console.log(myForm.value)

    const {firstname, lastname, email, password} = myForm.value;
    

    const formData = {
      firstName :firstname,
      lastName : lastname,
      email,
      password
    }
 
    console.log(formData)
    this.apiService.registerUser({
      ...formData,
      profilePic: this.mainImagePath
    }).subscribe(post => {
      this.messageService.add({
        severity:'info',
        detail: 'Usuario registrado',
        summary: 'Done',
        life: 2000
      });
      myForm.reset();
    })
    setTimeout(() => {
      console.log('navego')
      this.router.navigate(['/login']).then(); 
    }, 3000)
  }
}
