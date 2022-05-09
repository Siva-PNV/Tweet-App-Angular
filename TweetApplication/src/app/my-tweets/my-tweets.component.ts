import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.css'],
})
export class MyTweetsComponent implements OnInit {
  addForm: FormGroup;
  myTweets: any = [];
  userId: number;
  displayNoData: string;
  submitted = false;

  user: any;
  firstName: string;
  lastName: string;
  fullName: string;
  constructor(private loginService: LoginService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      comments: ['', Validators.required],
    });

    const username =
      localStorage.getItem('loginId') == null ? '' : 'abc@gmail.com';
    console.log('user name ' + username);
    if (username != null) {
      this.getTweetsByUserName(username);
    }
  }

  private getTweetsByUserName(username: string) {
    this.loginService.getTweetsByUserName(username).subscribe((data) => {
      this.myTweets = data;

      if (this.myTweets.length > 0) {
        this.displayNoData = 'true';
        this.loginService.getUserByUserName(username).subscribe((data) => {
          this.user = data;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
        });
      } else {
        this.displayNoData = 'false';
      }
    });
  }

  addComments(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null ? '' : 'abc@gmail.com';

    this.submitted = true;
    console.log(this.addForm.invalid);
    if (this.addForm.invalid) {
      return;
    }

    const userComment = {
      username: loginId,
      comment: this.addForm.value.comments,
    };
    if (loginId) {
      this.loginService
        .addComment(userComment, loginId, tweetId)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
