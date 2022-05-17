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
      .post(
        'http://localhost:8080/api/v1.0/tweets/login',
        loginCredentials,
        httpOptions1
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
    console.log(username);
    return this.http
      .get(`http://localhost:8080/api/v1.0/tweets/${username}`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getUserByUserName(username: string) {
    return this.http.get(
      `http://localhost:8080/api/v1.0/tweets/user/search/${username}`
    );
  }

  public addComment(userName: string, tweetId: string, userComment: any) {
    const comment = { comment: userComment };
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${userName}/reply/${tweetId}`,
        comment,
        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getAllTweets() {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/all}`,

        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getAllUsers() {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/users/all`,

        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public searchUserTweet(tweetId: string) {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/${tweetId}`,

        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public createTweet(userName: string, tweet: any) {
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${userName}/add`,
        tweet,
        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getTweetLikesById(tweetId: string) {
    return this.http.get(
      `http://localhost:8080/api/v1.0/tweets/getLike/${tweetId}`
    );
  }

  public getTweetCommentsById(tweetId: any) {
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${tweetId.username}/add`,
        tweetId,
        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public addLike(userName: string, tweetId: any) {
    return this.http
      .put(
        `http://localhost:8080/api/v1.0/tweets/${userName}/like/${tweetId}`,
        { responseType: 'json' },
        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
}
