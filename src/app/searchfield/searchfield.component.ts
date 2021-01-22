import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ServicesService } from '../services/services.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Food } from '../Model/food';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {

  displayedColumns: string[] = ['itemNo', 'itemdescription'];

  displayedColumns2: string[] = ['selection', 'itemNo', 'itemdescription', 'carbs'];

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  searchForm: FormGroup;
  foodselection: FormGroup;
  username: string;

  total:number=0;

  selectedRow: string[]=[];

  itemnumbers: number[]=[];
  itemdesc: string[]=[];
  itemunit: string[]=[];
  itemcarbs: number[]=[];
  foodlistdesc: Food[];
  dataSource;
  meal: Food[]=[];
  mealmaker: Food[]=[];

  data;
  lengthone: number;
  lengthtwo: number;

  selectedFoodsIDs: number;
  ids: number[] =[];
  units: string[] =[];
  foodns: string[] = [];
  carbs: number[] = [];

  constructor(private apiService: ServicesService, private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private router: Router) {
      this.username = apiService.getToken();
      this.username = this.username.replace(/['"]+/g, '');
     }
  

  ngOnInit(): void {

   

    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.apiService.getMeal(this.username).subscribe(
      (data:any) => {
        this.meal = data;
        console.log(this.meal);
        this.lengthone = this.meal.length;

        for(let i=0; i<this.meal.length; i++){
          this.ids.push(data[i].id);
          this.units.push(data[i].unit);
          this.foodns.push(data[i].foodn);
          this.carbs.push(data[i].carbs);

          this.total= this.total + parseFloat(data[i].carbs);

        }
        this.data = new MatTableDataSource<Food>(this.meal);
        this.data.sort = this.sort;


    });

  }
 

  fetchFoods(searchForm){

    console.log(searchForm.value);
    
    this.apiService.searchFoods(searchForm.controls.search.value).subscribe(
      (data:any)=> {
          this.foodlistdesc = data;
          this.lengthtwo = this.foodlistdesc.length;
          console.log(this.foodlistdesc);
          

           this.dataSource = new MatTableDataSource<Food>(this.foodlistdesc);
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;


        });



    
  }
  //receives itemnumber
  deleteRow(value:number) {
    //push to service--delete all where itemno = value
    console.log(value);
    console.log(this.username);
    this.apiService.deleteRow(value, this.username).subscribe(
      data=>{
      }
    );
    window.location.reload();
    //this.table.renderRows();
  }

  clearTable(){
    this.apiService.clearFoods(this.username).subscribe(
      data => {
       //window.location.reload();
      }
      );
    window.location.reload();
  }
  

  radioChangeHandler(event:any){
    this.selectedFoodsIDs = event.target.value;
    console.log(this.selectedFoodsIDs)
  }

  onRowClicked(row) {
    this.selectedRow = row;

    console.log(this.selectedRow['itemNo']);

    this.addToTable(this.selectedRow['itemNo']);

    window.location.reload();
    window.location.reload();


  }

  addToTable(value:any){
    this.apiService.addMeal(this.username, value).subscribe(
      (data: any) => {
        this.mealmaker = data;
        console.log(this.meal);
      }
    )
  }

  getTotalCarbs(){
    this.apiService.setTotalCarbs(this.total);
    return this.total;
  }
/*
  getSelectedFoods(){
    this.selectedFoodsIDs = _.map(
      this.foodselection.controls.selectFood["controls"], (data, i) => {
        return data.value && this.itemnumbers[i];
      }
    );
  }

  onSubmit(foodselection){/*
    this.selectedInput = food;
    this.toggle = true;
    this.searchInput = food.itemdescription;*/
/*
    this.apiService.mealRemixer(this.searchForm.itemid, this.searchForm.units, this.searchForm.carbcount).subscribe(
      data => {
        this.router.navigate(['mealplanner']);
      }
    )

    this.getSelectedFoods();
  }

  theSelected(values:any){
    const selected = values.map(data => {
      return new FormControl(data.selected || false);
    });
    return new FormArray(selected);
  }*/

}
