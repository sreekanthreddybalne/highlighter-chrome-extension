import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { PopupComponent } from './popup/popup.component';
import { AuthGuard } from './auth/auth.guard';
import { AnonymousGuard } from './auth/anonymous.guard';


const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'event', component: EventComponent },
  { 
    path: 'popup', 
    component: PopupComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: "auth",
    loadChildren: ()=>import('src/app/auth/auth.module').then(m=>m.AuthModule),
    canLoad: [AnonymousGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
