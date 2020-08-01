import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  user: User;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    ){
      this.afAuth.user.subscribe(user=>this.user=user);

  }

  logout(){
    this.authService.logout();
  }

  createHighlightCard(){
    let payload = {
      title: "Some nice title",
      link: "http://google.com",
      highlight: {
        text: "selected text two"
      }
    };

    this.http.post<any>(
      `${environment.functionsEndpoint}/createHighlightCard`,
      {data: payload}).subscribe(_=>console.log(_));
    }

}
