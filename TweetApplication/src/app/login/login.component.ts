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
  constructor(private fb: FormBuilder, private router: Router) {}

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
  }
}
