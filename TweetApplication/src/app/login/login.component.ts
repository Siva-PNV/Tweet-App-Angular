import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserLogin: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.UserLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  OnSubmit() {
    this.submitted = true;
    if (this.UserLogin.invalid) {
      console.log('invalid');
      return;
    }
    this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/login?userName=` +
          this.UserLogin.value.username +
          `&password=` +
          this.UserLogin.value.password
      )
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/home');
        },
        (err) => {
          alert(err.message);
        }
      );
  }
}
