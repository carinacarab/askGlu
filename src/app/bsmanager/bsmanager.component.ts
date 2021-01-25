import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-bsmanager',
  templateUrl: './bsmanager.component.html',
  styleUrls: ['./bsmanager.component.css']
})
export class BsmanagerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['avgSugar', 'blooda1c'];

  displayedColumns2: string[] = ['date', 'sugar'];

  length: number;

  bsform: FormGroup;
  username:string;

  dataSource;
  data;

  informacion: string[];
  statistics: string[] = [];
  dates: Date[] =[];
  sugar: number[] = [];

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { 
      this.username = apiService.getToken();
      this.username = this.username.replace(/['"]+/g, '');

    
  }

  ngOnInit(): void {
    this.apiService.getreadings(this.username).subscribe(
      (data:any) => {
        this.informacion = data;
        this.length = this.informacion.length;
        //console.log(this.informacion[0].sugar);
        for(let i=0; i<this.informacion.length; i++){
          this.dates.push(data[i].date);
          this.sugar.push(data[i].sugar);
        }
       
        this.dataSource = new MatTableDataSource<string>(this.informacion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.getChart(this.dates,this.sugar);

      }
    );

    this.apiService.getbloodstats(this.username).subscribe(
      (data:any) => {
        this.statistics.push(data);
        //console.log(this.statistics);
        this.data = new MatTableDataSource<string>(this.statistics);
      }
    );

  }
  getChart(value:any, value2:any){
    //console.log(this.dates);
    //console.log(this.sugar);
    var myLineChart = new Chart("ctx", {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{
          label: "Sugar Readings",
      
          data: this.sugar,

          backgroundColor: [
            'rgba(67, 0, 84, 0.57'],

          borderColor: ['rgba(255, 255, 255, 0)'],

          pointBackgroundColor: ['rgba(0, 0, 0, 1)']
        }, ]
      },
      options: {

      }
    });
  }


}
