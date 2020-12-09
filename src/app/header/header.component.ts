import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  location = '';
  community = '';
  count = 1;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.location = localStorage.getItem('company_name');
    this.community = localStorage.getItem('community_name');
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
}
  OpenNav() {
    this.count++;
    let content = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
    if(this.count % 2 === 0) {
      document.getElementById("Sidebar").style.width = "0";
      document.getElementById("Sidebar").style.transitionDuration = "0.5s";
      document.getElementById("navbutton").style.width = "85px";
      document.getElementById("navbutton").style.transitionDuration = "0.5s";
      content[0].style.marginLeft = "10px";
      content[0].style.transitionDuration = "0.5s";
    }
    else {
      document.getElementById("Sidebar").style.width = "211px";
      document.getElementById("Sidebar").style.zIndex ="5";
      document.getElementById("Sidebar").style.transitionDuration = "0.5s";
      document.getElementById("navbutton").style.width = "211px";
      document.getElementById("navbutton").style.transitionDuration = "0.5s";
      if( window.screen.width > 700) {
        console.log(window.screen.width);
        content[0].style.marginLeft = "221px";
        // document.getElementsByClassName("content")[0].style.backgroundColor = "rgba(0,0,0,0.4)";
        console.log(document.getElementsByClassName("content"))
      }
      content[0].style.transitionDuration = "0.5s";
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
