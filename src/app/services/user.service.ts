import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../employee";
import {Response} from "../model/Response";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public Register(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.apiServerUrl}/api/auth/registration`, user);
  }
  public LoginIn(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.apiServerUrl}/api/auth/signin`, user);
  }
}
