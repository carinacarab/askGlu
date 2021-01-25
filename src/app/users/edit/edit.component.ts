import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ServicesService } from '../../services/services.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  passForm: FormGroup;
  //variables
  userInfo: string[]= []; 
  username:string;

  medreqs: number[]=[];

  //for mat-tables
  displayedColumns: string[] = ['first', 'last', 'username', 'email'];
  displayedColumns2: string[] = ['permdose', 'timeofday', 'correction', 'mealratio', 'pillfreq'];

  dataSource; //for the user table
  secondDataSource; //for the meds editing

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) {
      this.username = this.apiService.getToken();
      this.username = this.username.replace(/['"]+/g, '');

     }

  ngOnInit(): void {
    this.passForm = this.formBuilder.group({
      newpass: ['']
    });

    this.apiService.getUserInfo().subscribe(
      (data: any) =>{
        this.userInfo = data;
        this.dataSource = new MatTableDataSource<string>(this.userInfo);
      }
    );

    this.apiService.getmedreqs().subscribe(
      (data:any)=>{
        this.medreqs = data;
        console.log(this.medreqs);
        this.secondDataSource = new MatTableDataSource<number>(this.medreqs);

      }
    )

  }
  changeReqs(){
    console.log("pressed");
    this.router.navigate(['reassignmeds']);
  }

  updatePassword(){
    console.log(this.passForm.value);
    this.apiService.updatePass(this.username, this.passForm.controls.newpass.value).subscribe(
      data =>{
        
      }
    );
    //window.location.reload();
  }

}
