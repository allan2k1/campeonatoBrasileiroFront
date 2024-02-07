import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clube} from "../model/Clube";

@Injectable({
  providedIn: 'root'
})
export class ClubeService {

  private url:string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getClubes():Observable<Clube[]>{
    return this.http.get<Clube[]>(this.url);
  }

  registerClube(cust:Clube):Observable<Clube>{
    return this.http.post<Clube>(this.url, cust);
  }

  editClube(cust:Clube):Observable<Clube>{
    return this.http.put<Clube>(this.url, cust);
  }

  deleteClube(id:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id);
  }
}
