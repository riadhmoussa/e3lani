import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HomeComponent} from './home/home.component';
import {FeedComponent} from './feed/feed.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {path: 'home', component: HomeComponent},
  { path: 'feed', component: FeedComponent},
  {path: 'admin', component: AdminHomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
