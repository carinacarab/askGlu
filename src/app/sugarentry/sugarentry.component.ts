import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sugarentry',
  templateUrl: './sugarentry.component.html',
  styleUrls: ['./sugarentry.component.css']
})
export class SugarentryComponent implements OnInit {

  bsform: FormGroup;
  username: string;

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { 
      this.username = apiService.getToken();
      this.username = this.username.replace(/['"]+/g, '');

    
  }

  ngOnInit(): void {
    this.bsform = this.formBuilder.group({
      bs: ['',[Validators.required] ]
    });
  }

  onSubmit(bsform){
    console.log(this.bsform.value);

    this.apiService.setLastSugar(this.bsform.controls.bs.value);
  
    this.apiService.savereading(this.username, this.bsform.controls.bs.value).subscribe(
      data=> {
        //window.location.reload();
        //this.router.navigate(['bsmanager']);
      }

    );
  }

}
