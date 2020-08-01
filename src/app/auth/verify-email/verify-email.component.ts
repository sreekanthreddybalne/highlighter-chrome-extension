import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  submitting: boolean = false;
  user: firebase.User;
  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.user.subscribe(user=>{
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

  sendVerificationEmail(){
    this.submitting = true;
    this.afAuth.user.subscribe(user=>{
      user.sendEmailVerification().then(success=>{
        this.submitting = false;
      }, err=>{
        console.log(err);
        this.submitting=false;
      })
    })
  }

}
