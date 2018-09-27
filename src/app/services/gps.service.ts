import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Gps } from '../model/gps';
import { HttpHeaders } from '@angular/common/http';

const userApiUrl = 'http://localhost:3000/gps';

@Injectable()
export class GpsService {

  myHttpClient: HttpClient;

  constructor(httpclient: HttpClient) {
    this.myHttpClient = httpclient;
  }

  getGpsUser(): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/user`);
  }

  getGpsUserDay(date:string): Observable<any> {
    const http_Headers = {
      headers: new HttpHeaders({
        'ddate': date
      })
    }
    return this.myHttpClient.get(`${userApiUrl}/user/day`,http_Headers)
  }
  getGpsId(id: string): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/admin/${id}`);
  }
  getGpsIdDay(id: string, date:string): Observable<any> {
    const http_Headers = {
      headers: new HttpHeaders({
        'ddate': date
      })
    }
    return this.myHttpClient.get(`${userApiUrl}/admin/${id}/day`,http_Headers)
  }

}
