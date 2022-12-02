import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
