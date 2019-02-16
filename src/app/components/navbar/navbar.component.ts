import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) {
  }

  // ngOnInit() {
  //   this.authService.loggedInUser.subscribe(
  //     user => {
  //       this.user = user;
  //     });
  // }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('username'));
    console.log(this.user );
  }


  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
    return false;
  }

}
