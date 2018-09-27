import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '../model/ticket';
import { HttpHeaders } from '@angular/common/http';
import { Debt } from '../model/debt';

const userApiUrl = 'http://localhost:3000/tickets';

@Injectable()
export class TicketService {

  myHttpClient: HttpClient;

  constructor(httpclient: HttpClient) { 
    this.myHttpClient = httpclient;
  }

  getTicketList(): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/user`);
  }
  getTicketListUser(id:string): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/${id}`);
  }

  getAllTicket(): Observable<any> {
    return this.myHttpClient.get(`${userApiUrl}/adm`);
  }

  putTicket(data: Debt, username: string, datee: string, num: string, nstop: string): Observable<any> {
    console.log('service',username);
    console.log('service',datee);
    const http_Headers = {
      headers: new HttpHeaders({
        'username': username,
        'ddate': datee,         
        'num': num,
        'nstop':nstop
      })
    }
    return this.myHttpClient.put(`http://localhost:3000/tickets/ticket`,data,http_Headers)
  }

}
