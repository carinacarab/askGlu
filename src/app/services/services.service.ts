import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../Model/api-response';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl:string = "localhost/askGluWebApp/php";

  constructor(private http: HttpClient) { }

  public login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login.php', loginData);
  }

  public register(registerData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register.php', registerData);
  }
}