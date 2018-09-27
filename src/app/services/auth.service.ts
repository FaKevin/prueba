import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const authApiUrl = 'http://localhost:3000/auth';

@Injectable()
export class AuthService {

  constructor(private htttpclient: HttpClient) { }

  login(credentials): Observable<any> {
    return this.htttpclient.post(`${authApiUrl}/login`, credentials);
  };

}