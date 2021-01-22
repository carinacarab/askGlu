import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { ApiResponse } from '../Model/api-response';
import { User } from '../Model/user';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../Model/api-response';
import { Posts } from '../Model/posts';
import { Food } from '../Model/food';
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

  supportregister(username, first, last, email): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + '/supportregister.php', {username, first, last, email});
  }

  diabeticregister(username, permdose, time, correction, mealratio, pillfreq): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + '/diabeticregister.php', {username, permdose, time, correction, mealratio, pillfreq});
  }

  getPosts():Observable<ApiResponse> {
    return this.http.get<Posts>(this.baseUrl + '/getposts.php');
  }

  poster(user, post){
    return this.http.post(this.baseUrl +'/post.php', {user, post});
  }

  savereading(usern, reading): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl + '/bsmanager.php', {usern, reading});
  }

  getreadings(user){
    return this.http.post(this.baseUrl + '/retrieve.php', {user});
  }

  getMeal(user){
    return this.http.post(this.baseUrl + '/showMeal.php', {user});
  }

  getbloodstats(user){
    return this.http.post(this.baseUrl + '/bloodcalculator.php', {user})
  }

  searchFoods(name):Observable<ApiResponse>{
    return this.http.post<Food>(this.baseUrl + '/foodsmanipulator.php', {name});
  }

 /* mealRemixer(number, units, carbcount) {
    return this.http.post(this.baseUrl + '/meal.php', {number, units, carbcount});
  }*/

  addMeal(user, itemNo):Observable<ApiResponse>{
    return this.http.post<Food>(this.baseUrl+ '/meal.php', {user, itemNo});
  }

  getmedreqs(){
    return this.http.post(this.baseUrl + '/getMeds.php', this.getToken());
  }

  deleteRow(itemno, user){
    return this.http.post(this.baseUrl + '/deleteRows.php', {itemno, user});
  }

  clearFoods(userid){
    return this.http.delete(this.baseUrl + '/clearTable.php', userid);
  }

  setTotalCarbs(total){
    localStorage.setItem('carbs', total);
  }

  getTotalCarbs(){
    return localStorage.getItem('carbs');
  }

  removeCarbs(){
    localStorage.removeItem('carbs');
  }

  setLastSugar(reading: string){
    localStorage.setItem('sugar', reading);
  }

  getSugar(){
    return localStorage.getItem('sugar');
  }

  removeSugar(){
    localStorage.removeItem('sugar');
  }

  public get userVal(): User {
    return this.userSub.value;
  }

  setToken(token: string) {
    localStorage.setItem('user', token);
  }

  getToken () {
    return localStorage.getItem('user');
  }

  removeToken(){
    localStorage.removeItem('user');
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


