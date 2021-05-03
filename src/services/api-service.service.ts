import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http:HttpClient) { }
  public get(url, options?): Observable<any> {
    return this.http.get<any>(url, options);
  }
  
  getData(pin,date): Observable<any> {
    const publicCdn = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
    return this.get(publicCdn);
}
}
