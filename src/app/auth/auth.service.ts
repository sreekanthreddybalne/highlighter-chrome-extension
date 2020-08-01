import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user.model';
import { CookieService } from './cookie.service';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  public user$: Observable<User>;
  public user: firebase.User;
  public token: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private cookieService: CookieService,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      tap(_=>{
        this.user = _;
        this.user.getIdToken().then(_=>this.token=_);
      }),
      switchMap(user=>{
        //logged In
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          //logged out
          return of(null)
        }
      })
    );
  }

  get userIsAuthenticated(){
    return this.user$.pipe(
      take(1),
      map(user => {
        if(user)return true;
        return false;
      })
    );
  }

  get userId(){
    return this.user$.pipe(
      map(user => {
        if(user)return user.uid;
        return  null;
      })
    )
  }

  login() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
    window.location.reload();
  }

}
