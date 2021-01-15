import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/Model/posts';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message:string= "";

  user:string= "";

  posts: Posts[] = [];

  postForm: FormGroup;

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {

    this.user = this.apiService.getToken();
    this.user = this.user.replace(/['"]+/g, '');

    this.apiService.getPosts().subscribe(
      (data:any) => {
        this.posts = data;
        }    
    )

    this.postForm = this.formBuilder.group({
      post: ['']
    });
  }

  onSubmit(postForm){
    console.log(this.postForm.value);
    this.apiService.post(this.user, this.postForm.controls.post.value).subscribe(
      data => { 
          this.router.navigate(['profile']);  
      }
    );
  }


}
