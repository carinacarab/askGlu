import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  title:string = 'askGlu';
  loginbutton:boolean;
  logoutbutton:boolean;


  constructor() { 
    this.logoutbutton=false;
    this.loginbutton=true;
  }

  ngOnInit(): void {
  }

}
