import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message:string = "Please login to access your account.";

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
            private router: Router, private apiService: ServicesService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      return;
    }
  }
  

}
