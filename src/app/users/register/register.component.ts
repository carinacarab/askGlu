import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message:string = "";

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
              private router: Router, private apiService: ServicesService) { }

  registerForm: FormGroup;
  invalidRegister: boolean = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fName: ['',[Validators.required, Validators.maxLength(100)] ],
      lName: ['',[Validators.required, Validators.maxLength(100)] ],
      email: ['',[Validators.required, Validators.maxLength(35)] ],
      username: ['',[Validators.required, Validators.maxLength(20)] ],
      password: ['',[Validators.required, Validators.maxLength(100)] ],
      role: ['',[Validators.required, Validators.maxLength(7)] ]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return;
    }

    const registerData = {
      fName: this.registerForm.controls.fName.value,
      lName: this.registerForm.controls.lName.value,
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      role: this.registerForm.controls.role.value
    };

    this.apiService.register(registerData).subscribe((data: any) => {
      console.log(data);
    });
  }

}
