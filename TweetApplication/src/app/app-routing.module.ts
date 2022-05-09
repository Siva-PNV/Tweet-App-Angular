import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyTweetsComponent } from './my-tweets/my-tweets.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: UserDashboardComponent },
  { path: 'all-tweets', component: TweetsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-tweets', component: MyTweetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
