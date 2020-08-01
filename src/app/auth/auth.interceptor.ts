import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
    ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    if(this.authService.token){
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.token}`
        }
      });
    }
    return next.handle(request);
  }
}
