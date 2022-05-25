import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginCredentials } from 'src/app/model/LoginCredentials';

const httpOptions1 = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: boolean;
  baseUrl = 'http://localhost:8080/api/v1.0/tweets';
  constructor(private http: HttpClient) {}

  public checkUserCredentials(
    loginCredentials: LoginCredentials
  ): Observable<any> {
    return this.http
      .post(this.baseUrl + '/login', loginCredentials, httpOptions1)
      .pipe();
  }

  public storeUserData(username: string, firstName: string) {
    localStorage.setItem('loginId', username);
    localStorage.setItem('firstName', firstName);
  }

  public isLoggedIn() {
    if (localStorage.getItem('loginId')) return (this.loggedIn = true);
    return (this.loggedIn = false);
  }

  public logout() {
    localStorage.clear();
    this.loggedIn = false;
  }

  public register(userInfo: any): Observable<any> {
    return this.http
      .post(this.baseUrl + '/register', userInfo, httpOptions1)
      .pipe();
  }

  public forgotPassword(userName: string, newPassword: string) {
    return this.http
      .post(this.baseUrl + `/${userName}/forgot`, newPassword, httpOptions1)
      .pipe();
  }

  public getUserByUserName(username: string) {
    return this.http.get(this.baseUrl + `/user/search/${username}`);
  }

  public getAllUsers() {
    return this.http
      .get(
        this.baseUrl + `/users/all`,

        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
}
