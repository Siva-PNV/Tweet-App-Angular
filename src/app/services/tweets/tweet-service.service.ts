import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};
@Injectable({
  providedIn: "root",
})
export class TweetServiceService {
  // baseUrl = "http://localhost:8080/api/v1.0/tweets";
  baseUrl =
    "http://tweetapp-env.eba-gymvfjnz.us-east-1.elasticbeanstalk.com/api/v1.0/tweets";
  constructor(private http: HttpClient) {}

  // httpOptions1: any;
  // tokenVal =
  //   localStorage.getItem("authorization") == null
  //     ? ""
  //     : localStorage.getItem("authorization");
  // if(tokenVal: any) {
  //   this.httpOptions1 = {
  //     headers: new HttpHeaders({
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials": "true",
  //       "Access-Control-Allow-Headers": "",
  //       Authorization: tokenVal,
  //     }),
  //   };
  // }

  public getTweetsByUserName(username: string) {
    return this.http
      .get(this.baseUrl + `/${username}`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public showMyTweets(loginId: string) {
    return this.http.get(this.baseUrl + `/${loginId}`);
  }

  public showMyTweetsById(tweetId: string) {
    return this.http.get(this.baseUrl + `/byTweetId/${tweetId}`);
  }

  public addComment(userName: string, tweetId: string, userComment: any) {
    const comment = { comment: userComment };
    const token = this.storeToken();
    return this.http
      .post(this.baseUrl + `/${userName}/reply/${tweetId}`, comment, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getAllTweets() {
    return this.http
      .get(this.baseUrl + `/all`, httpOptions1)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public searchUserTweet(tweetId: string) {
    return this.http
      .get(
        this.baseUrl + `/${tweetId}`,

        httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public createTweet(userName: string, tweet: any) {
    const token = this.storeToken();
    return this.http
      .post(this.baseUrl + `/${userName}/add`, tweet, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getTweetLikesById(tweetId: string) {
    return this.http.get(this.baseUrl + `/getLike/${tweetId}`);
  }

  public getTweetCommentsById(tweetId: any) {
    return this.http
      .post(this.baseUrl + `/${tweetId.username}/add`, tweetId, httpOptions1)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public addLike(userName: string, tweetId: any) {
    const token = this.storeToken();
    return this.http
      .put(
        this.baseUrl + `/${userName}/like/${tweetId}`,
        { responseType: "json" },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTweet(loginId: string, tweetId: string, value: any) {
    const token = this.storeToken();
    return this.http.put(
      this.baseUrl + `/${loginId}/update/${tweetId}`,
      value,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  public deleteTweet(loginId: string, tweetId: string) {
    const token = this.storeToken();
    return this.http.delete(this.baseUrl + `/${loginId}/delete/${tweetId}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  public storeToken() {
    const token =
      localStorage.getItem("authorization") == null
        ? ""
        : localStorage.getItem("authorization");

    if (token != null) {
      return token;
    } else {
      return "";
    }
  }
}
