import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userName: string;
  lastTweet: any;

  UserName: String = 'Welcome, ';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLatestTweet();

    this.getWelcomeUserName();
  }

  getWelcomeUserName() {
    const fullName =
      localStorage.getItem('firstName') == null
        ? ''
        : localStorage.getItem('firstName');
    if (fullName != null) {
      this.UserName += fullName.toLocaleUpperCase();
    }
  }

  getLastUpdatedTweet() {
    this.getLatestTweet();
  }

  getLatestTweet() {
    this.http
      .get('http://localhost:8080/api/v1.0/tweets/all')
      .subscribe((data) => {
        this.lastTweet = data;
      });
  }
}
