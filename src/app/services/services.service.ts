import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { ApiResponse } from '../Model/api-response';
import { User } from '../Model/user';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../Model/api-response';
import { Posts } from '../Model/posts';
//import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private userSub: BehaviorSubject<User>;
  public user: Observable<User>;

  @Output() getLoggedInName : EventEmitter<any> = new EventEmitter();

  redirect_URL: string;

  baseUrl:string = "http://localhost:8080/php";

  constructor(private http: HttpClient, private router: Router) { 
    //localStorage.removeItem('user');
    this.userSub = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSub.asObservable();
  }
  //login function
  login(username, password){
    return this.http.post<User>(this.baseUrl + '/login.php', {username, password}).pipe(map(user => {
        //if(user){
          console.log(user.username);
          localStorage.setItem('user', JSON.stringify(user.username));
          this.userSub.next(user);
          //this.setToken(username);
        return user;
    }));
  }
//fName, lName, email, username, password, role
  register(user: User): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + '/register.php', user);
  }

  getPosts():Observable<ApiResponse> {
    return this.http.get<Posts>(this.baseUrl + '/getposts.php');
  }

  post(post : Posts): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl, post);
  }
  /*
  handleError(error: HttpErrorResponse){
    console.log("retrived error");
    return throwError(error);
  }
  */

  public get userVal(): User {
    return this.userSub.value;
  }

  setToken(token: string) {
    localStorage.setItem('user', token);
  }

  getToken () {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.userSub.next(null);
    this.router.navigate(['login']);
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


