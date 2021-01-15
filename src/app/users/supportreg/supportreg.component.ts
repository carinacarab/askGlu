import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supportreg',
  templateUrl: './supportreg.component.html',
  styleUrls: ['./supportreg.component.css']
})
export class SupportregComponent implements OnInit {

  supportForm: FormGroup;
  invalidRegister: boolean = false;

  username: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private router: Router, private apiService: ServicesService) {
      this.username = this.apiService.getToken();
     }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      fName: ['',[Validators.required, Validators.maxLength(100)] ],
      lName: ['',[Validators.required, Validators.maxLength(100)] ],
      email: ['',[Validators.required, Validators.email] ]
    });
  }

  onSubmit(){
    console.log(this.supportForm.value);

    this.apiService.supportregister(this.username, this.supportForm.controls.fName.value, this.supportForm.controls.lName.value, this.supportForm.controls.email.value)
        .subscribe(
            data => { 
                this.apiService.removeToken;
                this.router.navigate(['login']);  
            }
        );
    
  }

}
