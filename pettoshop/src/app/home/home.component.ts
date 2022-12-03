import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {
 
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    

  }

}
