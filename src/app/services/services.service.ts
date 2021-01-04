import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../Model/api-response';
import { User } from '../Model/user';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  @Output() getLoggedInName : EventEmitter<any> = new EventEmitter();

  redirect_URL: string;

  baseUrl:string = "http://localhost:8080/php";

  constructor(private http: HttpClient) { }

  public login(username, password){
    return this.http.post(this.baseUrl + '/login.php', {username, password}, {responseType: 'text'}).pipe(map(User => {
        this.setToken(username);
        this.getLoggedInName.emit(true);
        return User;
    }));
  }

  register(registerData){
    return this.http.post(this.baseUrl + '/register.php', {registerData}, {responseType: 'text'}).pipe(map( User => {
      return User;
   }));
  }
  handleError(error: HttpErrorResponse){
    console.log("retrived error");
    return throwError(error);
  }

  setToken( token: string) {
    localStorage.setItem('token', token);
  }

  getToken () {
    localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const userT = this.getToken();
    if (userT != null ) {
      return true;
    } else {
      return false;
    }
  }
}


