import { Component, NgModule, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  title:string = 'askGlu';
  loginbutton:boolean;
  signoutButton:boolean;

  constructor(private apiService: ServicesService) {
      apiService.getLoggedInName.subscribe(name=> this.changeName(name));
      if(this.apiService.isLoggedIn()){
        console.log("loggedin");
        this.loginbutton= false;
        this.signoutButton= true;
      }else {
        this.loginbutton= true;
        this.signoutButton= false;
      }
  }

  private changeName (name: boolean):void {
    this.signoutButton = name;
    this.loginbutton = !name;
  }

  logout(){
    this.apiService.deleteToken();
    window.location.href = window.location.href;
  }

  ngOnInit(): void {
  }

}
