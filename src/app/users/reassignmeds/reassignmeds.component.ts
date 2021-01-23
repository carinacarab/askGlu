import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-reassignmeds',
  templateUrl: './reassignmeds.component.html',
  styleUrls: ['./reassignmeds.component.css']
})
export class ReassignmedsComponent implements OnInit {

  diabeticForm: FormGroup;
  username: string; //bringing in username from token
  invalidRegister: boolean = false;



  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private router: Router, private apiService: ServicesService) {
      this.username = this.apiService.getToken();
      this.username = this.username.replace(/['"]+/g, '');


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

    this.apiService.diabeticUpdate(this.username, this.diabeticForm.controls.permdose.value, this.diabeticForm.controls.time.value, this.diabeticForm.controls.corratio.value, this.diabeticForm.controls.mealratio.value, this.diabeticForm.controls.freq.value)
        .subscribe(
            data => { 
                  
            }
        );
        this.router.navigate(['edit']);
    
  }

}
