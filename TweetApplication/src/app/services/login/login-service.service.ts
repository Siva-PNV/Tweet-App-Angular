import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginCredentials } from 'src/app/model/LoginCredentials';

const httpOptions1 = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '',
    loggedInUser: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: boolean;
  constructor(private http: HttpClient) {}

  public checkUserCredentials(
    loginCredentials: LoginCredentials
  ): Observable<any> {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/login?userName=` +
          loginCredentials.username +
          `&password=` +
          loginCredentials.password
      )
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
      .post(
        'http://localhost:8080/api/v1.0/tweets/register',
        userInfo,
        httpOptions1
      )
      .pipe();
  }

  public forgotPassword(userName: string, newPassword: string) {
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${userName}/forgot`,
        newPassword,
        httpOptions1
      )
      .pipe();
  }
  public showMyTweets(loginId: string) {
    return this.http.get(`http://localhost:8080/api/v1.0/tweets/${loginId}`);
  }

  public getTweetsByUserName(username: string) {
    return this.http.get(
      'http://localhost:8080/api/v1.0/tweets/' + username,
      httpOptions1
    );
  }

  public getUserByUserName(username: string) {
    return this.http.get(
      'http://localhost:8080/api/v1.0/tweets/user/search/' + username
    );
  }

  public addComment(userComment: any, userName: string, tweetId: string) {
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${userName}/reply/${tweetId}`,
        userComment,
        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
}
