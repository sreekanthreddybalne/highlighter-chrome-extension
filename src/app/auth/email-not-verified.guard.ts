import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EmailNotVerifiedGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.afAuth.user.pipe(
      take(1),
      tap(user=>{
        if(!user)this.router.navigate(['/auth'])
      }),
      map(user=>!!!user.emailVerified),
      tap(emailNotVerified=>{
        if(!emailNotVerified){
          this.router.navigate(['/auth'])
        }
      })
    );
  }
}
