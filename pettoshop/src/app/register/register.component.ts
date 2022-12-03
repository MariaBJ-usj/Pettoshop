import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  address: string = "";
  postalcode: string = "";
  city: string = "";
  country: string = "";
  phone: string = "";
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
      firstname: new FormControl(""),
      lastname: new FormControl(""),
      address: new FormControl(""),
      postalcode: new FormControl(""),
      city: new FormControl(""),
      country: new FormControl(""),
      phone: new FormControl("")
    });
  }

  submit(data: any) {
    alert(this.address);
    this.email = data.email;
    this.password = data.password;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.address = data.address;
    this.postalcode = data.postalcode;
    this.city = data.city;
    this.country = data.country;
    this.phone = data.phone;
    alert(this.address);

    this.authService.register(this.email, this.password, this.firstname, this.lastname,
      this.address, this.postalcode, this.city, this.country, this.phone).subscribe
      ({
        next: userInfo => {
          alert("Im here");
          this.authService.connectedUser = userInfo;
          if (userInfo) this.router.navigate(['/home']);
        },
        error: error => {
          console.log("error", error)
          alert("User already exists. Please login.");
        }
      });
  }
}
