import { Component, OnInit, ViewChild } from '@angular/core';
import { Posts } from 'src/app/Model/posts';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;

  displayedColumns: string[] = ['peer', 'post', 'time'];


  message:string= "";

  user:string= "";

  posts: Posts[] = [];
  post:string;
  length: number;

  dataSource;


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
        this.length = this.posts.length;

        this.dataSource = new MatTableDataSource<Posts>(this.posts);
        this.dataSource.paginator = this.paginator;
      }    
    )

    this.postForm = this.formBuilder.group({
      post: ['']
    });
  }

  

  onSubmit(postForm){
    //console.log(this.postForm.controls.post.value);
    this.post = this.postForm.controls.post.value;
    console.log(this.post);
    this.apiService.poster(this.user, this.postForm.controls.post.value).subscribe(
      data => { 
      
      }
    );
    //window.location.reload();
  }


}
