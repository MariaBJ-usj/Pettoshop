import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  user: User = new User();

  constructor(public auth: AuthService) {
    auth.isLogged();
    this.user = auth.connecteduser;
  }

  ngOnInit(): void {
  }

}
