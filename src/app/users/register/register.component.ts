import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
              private router: Router, private apiService: ServicesService) { }

  
  invalidRegister: boolean = false;

  diabetic: boolean;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fName: ['',[Validators.required, Validators.maxLength(100)] ],
      lName: ['',[Validators.required, Validators.maxLength(100)] ],
      email: ['',[Validators.required, Validators.email] ],
      username: ['',[Validators.required, Validators.maxLength(20)] ],
      password: ['',[Validators.required, Validators.minLength(8)] ],
      role: ['',[Validators.required, Validators.maxLength(7)] ]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    //if(this.registerForm.invalid)
    //  return;  this.registerForm.controls.fName.value, this.registerForm.controls.lName.value, this.registerForm.controls.email.value, this.registerForm.controls.username.value, this.registerForm.controls.password.value, this.registerForm.controls.role.value

    this.apiService.register(this.registerForm.value)
        .subscribe(
            (data: any) => { 
                this.apiService.setToken(this.registerForm.controls.username.value);

                console.log(data.role);
                
                if (data.role = "Diabetic"){
                  this.router.navigate(['diabeticreg']);
 
                }else{ 
                  if (data.role = "Support Person"){
                    this.router.navigate(['supportreg']);
                  }
                }
                //this.router.navigate(['login']);  
            }
        );
    
  }
}
