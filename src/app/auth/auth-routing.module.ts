import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EmailNotVerifiedGuard } from './email-not-verified.guard';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "verify-email",
    component: VerifyEmailComponent,
    canActivate: [EmailNotVerifiedGuard, ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
