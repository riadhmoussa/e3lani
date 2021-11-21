import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../employee';
import {Response} from '../model/Response';
import {Ad} from '../model/Ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMyAnnonces(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiServerUrl}/api/user/ad/user/${id}`);
  }

  public getAnnonces(): Observable<Response> {
    return this.http.get<Response>(`${this.apiServerUrl}/api/user/ad`);
  }
  public addAnnonce(ad: Ad): Observable<Response>{
    return this.http.post<Response>(`${this.apiServerUrl}/api/user/ad`, ad);
  }

  public deleteAd(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiServerUrl}/api/user/ad/${id}`);
  }

  public updateAd(ad: Ad, id: number): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/api/user/ad/${id}`, ad);
  }

}
