import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private authService: AuthService, private router: Router) { }

  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

   onLoginWithEmail(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then(res => {
        this.onLoginRedirect();
      }).catch(err => console.log(err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['pets/']);
  }
}
