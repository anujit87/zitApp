import { Component, OnInit } from '@angular/core';
import { GitService } from '../git.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userDetails:any;
  repoCount;
  gistCount;
  starCount;
  username;
  loading=false;
  status;

  constructor(private gitService:GitService,private route:Router) { }

  ngOnInit() {
    this.loading=true;
    this.userDetails=this.gitService.getUserInfoFromLocalStorage();
    if(!this.userDetails){
      this.route.navigate(['/login'])
    }
    this.loading=false;
    //console.log(this.userDetails);
    this.username=localStorage.getItem('username')
  }

  getStarCount(e){
    this.starCount=e;
  }

  getErrorStatus(event){
    this.status=event
  }

}
