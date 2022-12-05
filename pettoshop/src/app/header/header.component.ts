import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User = new User();
  displayLog:string = "display";
  displayCart:string = "hide";

  constructor(public auth: AuthService, private router: Router) {
    auth.isLogged();
    if (!auth.connecteduser) {
      this.displayLog = "display";
      this.displayCart = "hide";
    } else {
      this.user = auth.connecteduser;
      this.displayCart = "display";
      this.displayLog = "hide";
    }
  }

  logoutUser() {
    this.auth.logout();
    this.router.navigate(['/login'])
  }

  

  ngOnInit(): void {
  }

}
