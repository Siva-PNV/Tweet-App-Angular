import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { LoginService } from "../services/login/login-service.service";
import { TweetServiceService } from "../services/tweets/tweet-service.service";

@Component({
  selector: "app-user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.css"],
})
export class UserSearchComponent implements OnInit {
  othersTweets: any;
  userId: number;
  userName: string;
  user: any;
  tweetText: string;
  tweetId: string;
  comment: string;
  constructor(
    private loginService: LoginService,
    private tweetService: TweetServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params?.subscribe((params: Params) => {
      this.userName = params["userName"];
      this.getTweetsByUserName(this.userName);
    });
  }

  private getTweetsByUserName(username: string) {
    this.tweetService.searchUserTweet(username).subscribe((data) => {
      this.othersTweets = data;
    });

    this.loginService.getUserByUserName(this.userName).subscribe((data) => {
      this.user = data;
    });
  }

  likeTweet(tweetId: string) {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");
    if (loginId != null) {
      this.tweetService.addLike(loginId, tweetId).subscribe((data) => {
        this.getTweetsByUserName(this.userName);
      });
    }
  }

  reply() {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");
    if (loginId != null) {
      this.tweetService
        .addComment(loginId, this.tweetId, this.comment)
        .subscribe(
          (data) => {
            this.getTweetsByUserName(this.userName);
            location.reload();
          },
          (err) => {
            alert(err.message);
          }
        );
    }
  }

  public onOpenModal(): void {
    this.tweetText = "";
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#addTweetModal");
    container?.appendChild(button);
    button.click();
  }

  public onOpenCommentModal(tempTweetId: string): void {
    this.comment = "";
    this.tweetId = tempTweetId;
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#addCommentModal");
    container?.appendChild(button);
    button.click();
  }
}
