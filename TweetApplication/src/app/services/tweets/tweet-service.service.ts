import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
export class TweetServiceService {
  constructor(private http: HttpClient) {}

  public getTweetsByUserName(username: string) {
    return this.http
      .get(`http://localhost:8080/api/v1.0/tweets/${username}`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public showMyTweets(loginId: string) {
    return this.http.get(`http://localhost:8080/api/v1.0/tweets/${loginId}`);
  }

  public showMyTweetsById(tweetId: string) {
    return this.http.get(
      `http://localhost:8080/api/v1.0/tweets/byTweetId/${tweetId}`
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
        `http://localhost:8080/api/v1.0/tweets/all`,

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

  public updateTweet(loginId: string, tweetId: string, value: any) {
    return this.http.put(
      `http://localhost:8080/api/v1.0/tweets/${loginId}/update/${tweetId}`,
      value,
      httpOptions1
    );
  }

  public deleteTweet(loginId: string, tweetId: string) {
    return this.http.delete(
      `http://localhost:8080/api/v1.0/tweets/${loginId}/delete/${tweetId}`,
      httpOptions1
    );
  }
}
