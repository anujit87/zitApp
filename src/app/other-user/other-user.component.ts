import { Component, OnInit} from '@angular/core';
import { GitService } from '../git.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  userData:{};
  username;
  status;
  loading=false;
  starCount;

  constructor(private gitService:GitService,private _route:ActivatedRoute, private router:Router) {
    router.routeReuseStrategy.shouldReuseRoute=()=>false
   }

  ngOnInit() {
    
    if (localStorage.getItem('username') != null) {
      this.username = this._route.snapshot.paramMap.get('userId');
      //console.log(username)
      this.loading=true;
      this.gitService.searchUser(this.username).subscribe(
        user => {
          this.userData = user.body;
          this.loading=false;
          //console.log(user)
          
        },
        error=>{
          //console.log(error.status)
          this.status=error.status
          this.loading=false;
        }
      )
      
    }else{
      this.status=401
    }
  }

  getStarCount(e){
    this.starCount=e;
  }

  getErrorStatus(event){
    this.status=event
  }
  
}
