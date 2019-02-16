import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
  loggedInUser = new Subject;
  authToken: any;
  user: any;


  constructor(
    private http: Http,

  ) { }



  authenticateUser(user) {
    const headers = new Headers();
    console.log(user);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.appUrl+'/user/login', user, { headers: headers })
      .map(res => {
        if(res.json().success){
        this.loggedInUser.next(res.json().user.username);
      }
        return res.json();
      });
  }

  

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = 'JWT ' + token;
  }

  loggedIn() {
    if(JSON.parse(localStorage.getItem('user')))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}


