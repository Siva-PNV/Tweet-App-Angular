import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllTweets } from '../model/tweets-model';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
})
export class TweetsComponent implements OnInit, AfterViewInit {
  allTweets: AllTweets;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.http
      .get('http://localhost:8080/api/v1.0/tweets/all')
      .subscribe((data: any) => {
        this.allTweets = data;
      });
  }
  // getAllTweets() {
  //   this.http
  //     .get('http://localhost:8080/api/v1.0/tweets/all')
  //     .subscribe((data: any) => {
  //       this.allTweets = data;
  //     });
  // }
}
