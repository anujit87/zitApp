import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import {ToastrModule} from 'ngx-toastr';
import { GitService } from './git.service';
import { RepositoryComponent } from './repository/repository.component';
import { GistComponent } from './gist/gist.component';
import { FollowingComponent } from './following/following.component';
import { FollowerComponent } from './follower/follower.component';
import { StarComponent } from './star/star.component';
import { SearchComponent } from './search/search.component';
import { OtherUserComponent } from './other-user/other-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './error/error.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RepositoryComponent,
    GistComponent,
    FollowingComponent,
    FollowerComponent,
    StarComponent,
    SearchComponent,
    OtherUserComponent,
    NavBarComponent,
    ErrorComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path:'login', component: LoginComponent, pathMatch:'full'},
      { path:'', redirectTo:'login', pathMatch:'full'},
      { path:'user',component:UserComponent},
      { path:'users/:userId',component:OtherUserComponent},
      { path:'*', component:LoginComponent},
      { path:'**', component:LoginComponent}
      
    ])
  ],
  providers: [GitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
