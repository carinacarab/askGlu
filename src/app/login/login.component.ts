import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message:string = "Please login to access your account.";

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  //returnUrl : string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
            private route: ActivatedRoute, private router: Router, private apiService: ServicesService) { 
              if(this.apiService.userVal) {
               // this.router.navigate(['./profile']);
              }
            }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //this.returnUrl = this.route.snapshot.queryParams['user'] || '/';

  }
  //on submit function from HTML form
  onSubmit(loginForm){   
    //if nothing was entered, return
    if(this.loginForm.invalid){
      return;
    }
    //else, pass loginform username and password into the login function from api service
    this.apiService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
        .subscribe( 
          (data: any) => {
            this.message = data.message;
            //console.log(data.username);
            if(data.token) {
              window.localStorage.setItem('token', data.token);
              this.router.navigate(['profile']);
              this.invalidLogin = false;
              //this will change the navigation bar
              this.apiService.getLoggedInName.emit(true);
            }
            else {
              //if the login is invalid, user has no permission to other navigation items
              this.invalidLogin = true;
            }
          }); 
          
  }

}
