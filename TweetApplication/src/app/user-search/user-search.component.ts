import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  othersTweets: any = [];
  userId: number;
  userName: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userName = params['userName'];
      this.getTweetsByUserName(this.userName);
    });
  }

  private getTweetsByUserName(username: string) {
    this.loginService.searchUserTweet(username).subscribe((data) => {
      this.othersTweets = data;
    });
  }
}
