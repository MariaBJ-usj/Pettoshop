import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  formData: FormGroup;

  constructor(public authService: AuthService, private router: Router, fb: FormBuilder) {
    this.formData = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  submit(data: any) {
    this.email = data.email;
    this.password = data.password;

    this.authService.login(this.email, this.password).subscribe({
      next: userInfo => {
        this.authService.connectedUser = userInfo;
        if (userInfo) this.router.navigate(['/home']);
      },
      error: error => {
        console.log("error", error)
        alert("Email or Password is incorrect");
      }
    });
  }
}
