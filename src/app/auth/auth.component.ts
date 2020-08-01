import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{

  constructor(
    public authService: AuthService,
    private router: Router
    ) {
  }
  login() {
    this.authService.login().then(_=>{
      this.router.navigate(['/'])
    });
  }

}
