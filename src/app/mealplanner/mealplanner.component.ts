import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-mealplanner',
  templateUrl: './mealplanner.component.html',
  styleUrls: ['./mealplanner.component.css']
})
export class MealplannerComponent implements OnInit {

  sugarReading: number = 0;
  carbtotal: number = 0;
  insulinDoseCOR: number = 0;
  insulinDoseMEAL: number;
  requiredInsulinAMTC: number = 0;
  requiredInsulinAMTM: number = 0;
  requiredInsulinAMTT: number = 0;
  medreqs: string[]=[];



  constructor(private apiService: ServicesService, private route: ActivatedRoute, private router: Router) {

    this.sugarReading = parseInt(this.apiService.getSugar());
    this.carbtotal = parseFloat(this.apiService.getTotalCarbs());
    console.log(this.sugarReading);

    this.apiService.getmedreqs().subscribe(
      (data:any) => {
        console.log(data);
        this.insulinDoseCOR = data[0].correctionratio;
        this.insulinDoseMEAL = data[0].mealratio;
        //console.log(this.insulinDoseCOR);

        if(this.sugarReading > 150){
          this.requiredInsulinAMTC = this.calcCorrection(this.sugarReading, this.insulinDoseCOR);
        } else { 
          this.requiredInsulinAMTC = 0;
            
        }
        if(this.carbtotal>0){
          this.requiredInsulinAMTM = this.mealPlanning(this.carbtotal, this.insulinDoseMEAL);
        } else {
          this.requiredInsulinAMTM = 0;
        }


        this.requiredInsulinAMTM = parseFloat(this.requiredInsulinAMTM.toFixed(2));
        this.requiredInsulinAMTC = parseFloat(this.requiredInsulinAMTC.toFixed(2));
        this.requiredInsulinAMTT = this.requiredInsulinAMTC + this.requiredInsulinAMTM;
        this.requiredInsulinAMTT = parseFloat(this.requiredInsulinAMTT.toFixed(2));
       // console.log(this.requiredInsulinAMTT);
      }
    )
   }

  ngOnInit(): void { 

  }
  refreshPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['mealplanner']);
  }); 
  }

  calcCorrection(value:number, value2: number){
    return (value-120)/value2;

  }

  mealPlanning(value:number, value2: number){
    return value/value2;
  }

}
