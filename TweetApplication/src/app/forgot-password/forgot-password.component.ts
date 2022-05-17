import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  message: string;
  constructor(private fb: FormBuilder, private _loginService: LoginService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  forgotPassword() {
    this._loginService
      .forgotPassword(
        this.forgotPasswordForm.value.email,
        this.forgotPasswordForm.value.newPassword
      )
      .subscribe(
        (data) => {
          console.log('data ' + data);
        },
        (err) => {
          if (err.status == 400) {
            this.message = 'User name not found';
          } else if (err.status == 200) {
            this.message = 'password has changed please login !!!';
          }
        }
      );
  }
}
