import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-bsmanager',
  templateUrl: './bsmanager.component.html',
  styleUrls: ['./bsmanager.component.css']
})
export class BsmanagerComponent implements OnInit {

  bsform: FormGroup;

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.bsform = this.formBuilder.group({
      bs: ['',[Validators.required] ]
    });
  }

  onSubmit(bsform){

  }

}
