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

  username: string = "";
  password: string = "";
  formData: FormGroup;

  constructor(public authService: AuthService, private router: Router, fb: FormBuilder) {
    this.formData = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
   });
  }

  submit(data:any) {
    this.username = data.username;
    this.password = data.password;

    console.log("Username: " + this.username);
    console.log("Password: " + this.password);

    this.authService.login(this.username, this.password).subscribe(
      userInfo => {
        this.authService.connectedUser = userInfo;
        if (userInfo) this.router.navigate(['/home']);
      }, error => {
        console.log("error", error)
      });
  }
}
