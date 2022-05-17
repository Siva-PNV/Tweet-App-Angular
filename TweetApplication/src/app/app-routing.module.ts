import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { MyTweetsComponent } from './my-tweets/my-tweets.component';
import { RegisterComponent } from './register/register.component';
import { TweetCommentsLikesComponent } from './tweet-comments-likes/tweet-comments-likes.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserTweetComponent } from './user-tweet/user-tweet.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: UserDashboardComponent },
  { path: 'all-tweets', component: TweetsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-tweets', component: MyTweetsComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'search/:userName', component: UserSearchComponent },
  { path: 'add-tweet', component: AddTweetComponent },
  { path: 'tweet/:tweetId', component: UserTweetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
