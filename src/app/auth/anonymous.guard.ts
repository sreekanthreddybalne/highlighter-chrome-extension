import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanLoad {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.authState.pipe(
        take(1),
        tap(a=>console.log(a)),
        map(user=>!!!user),
        tap(isAnonymous=>{
          if(!isAnonymous)this.router.navigateByUrl('/')
        }),
      );
  }
}
