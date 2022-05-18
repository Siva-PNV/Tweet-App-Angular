import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  othersTweets: any;
  userId: number;
  userName: string;
  user: any;
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

    this.loginService.getUserByUserName(this.userName).subscribe((data) => {
      this.user = data;
    });
  }

  likeTweet(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.addLike(loginId, tweetId).subscribe();
      this.getTweetsByUserName(this.userName);
    }
  }

  reply(tweetId: string) {
    //console.log('comme ' + this.comment);
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    // if (loginId != null) {
    //   this.loginService.addComment(loginId, tweetId, this.comment).subscribe(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (err) => {
    //       alert(err.message);
    //     }
    //   );
    this.getTweetsByUserName(this.userName);
  }
}
