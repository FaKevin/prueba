import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

const userApiUrl = 'http://localhost:3000/users';

@Injectable()
export class UserService {

  myHttpClient: HttpClient;

  constructor(httpclient: HttpClient) {
    this.myHttpClient = httpclient;
  }

  getUserList(): Observable<any> {
    return this.myHttpClient.get(userApiUrl);
  }

  getProfile(): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/profile`);
  }
  
  getUserById(id: string): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/${id}`);
  }

  createUser(newUser: User): Observable<any> {
    return this.myHttpClient.post(userApiUrl, newUser);
  }

  editeUser(id: string, editUser:User):Observable<any>{
    return this.myHttpClient.put(`${userApiUrl}/${id}`,editUser)
  }
  
  deleteUser(id: string): Observable<any> {
    return this.myHttpClient.delete(`${userApiUrl}/${id}`);
  }
}