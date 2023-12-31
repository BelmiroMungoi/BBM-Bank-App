import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  getAccountByAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "accounts/");
  }
}
