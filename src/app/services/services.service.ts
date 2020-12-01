import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../Model/api-response';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost/askGluWebApp/php';

  login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login.php', loginData);
  }

  register(registerData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register.php', registerData);
  }
}