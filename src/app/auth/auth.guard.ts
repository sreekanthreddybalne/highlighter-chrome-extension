import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      map(user=>!!user),
      tap(isLoggedIn=>{
        if(!isLoggedIn)this.router.navigateByUrl('/auth');
      }),
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.authState.pipe(
        take(1),
        map(user=>!!user),
        tap(isLoggedIn=>{
          if(!isLoggedIn)this.router.navigateByUrl('/auth');
        }),
      );
  }
}
