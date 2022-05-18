import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userName: string;
  lastTweet: any;
  tweetCreate: FormGroup;
  user: any;
  comment: string;
  searchUser: string;
  name: string;
  tweetText: string;
  showForm: boolean = false;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLatestTweet();

    this.getWelcomeUserName();
    this.tweetCreate = this.fb.group({
      tweetText: ['', [Validators.required]],
    });
  }

  getWelcomeUserName() {
    const fullName =
      localStorage.getItem('firstName') == null
        ? ''
        : localStorage.getItem('firstName');
    if (fullName != null) {
      this.userName = fullName;
    }
  }

  getLastUpdatedTweet() {
    this.getLatestTweet();
  }

  getLatestTweet() {
    this.http
      .get('http://localhost:8080/api/v1.0/tweets/all')
      .subscribe((data) => {
        console.log(data);
        this.lastTweet = data;
      });

    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.getUserByUserName(loginId).subscribe((data) => {
        this.user = data;
      });
    }
  }
  likeTweet(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.addLike(loginId, tweetId).subscribe();
      this.getLatestTweet();
    }
  }

  reply(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.addComment(loginId, tweetId, this.comment).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          alert(err.message);
        }
      );
      this.getLatestTweet();
    }
  }

  search() {
    this.loginService.getUserByUserName(this.searchUser).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/search', this.searchUser]);
    });
  }

  showTweetForm() {
    this.showForm = true;
  }

  addTweet() {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.createTweet(loginId, this.tweetCreate.value);
    }
  }
}
