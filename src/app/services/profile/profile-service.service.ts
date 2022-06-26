import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};
@Injectable({
  providedIn: "root",
})
export class ProfileServiceService {
  // baseUrl = "http://localhost:8080/api/v1.0/tweets";
  baseUrl = "http://tweets.us-east-1.elasticbeanstalk.com/api/v1.0/tweets";
  constructor(private http: HttpClient) {}

  public addProfile(userName: string, file: any) {
    const formData: FormData = new FormData();
    formData.append("username", userName);
    formData.append("file", file);

    return this.http
      .put(this.baseUrl + `/avatar`, formData, httpOptions1)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
}
