import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-diabeticreg',
  templateUrl: './diabeticreg.component.html',
  styleUrls: ['./diabeticreg.component.css']
})
export class DiabeticregComponent implements OnInit {

  diabeticForm: FormGroup;
  invalidRegister: boolean = false;
  username: string; //bringing in username from token

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private router: Router, private apiService: ServicesService) {
      this.username = this.apiService.getToken();
     }

  ngOnInit(): void {
    this.diabeticForm = this.formBuilder.group({
      permdose: ['',[Validators.required, Validators.maxLength(100)] ],
      time: ['',[Validators.required, Validators.maxLength(100)] ],
      corratio: ['',[Validators.required] ],
      mealratio: ['', [Validators.required]],
      freq: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.diabeticForm.value);

    this.apiService.diabeticregister(this.username, this.diabeticForm.controls.permdose.value, this.diabeticForm.controls.time.value, this.diabeticForm.controls.corratio.value, this.diabeticForm.controls.mealratio.value, this.diabeticForm.controls.freq.value)
        .subscribe(
            data => { 
                this.apiService.removeToken;
                this.router.navigate(['login']);  
            }
        );
    
  }


}
