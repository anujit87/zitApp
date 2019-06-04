import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitService } from '../git.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {

  followers;
  followerCount;
  @Input() username:string;
  @Input() total;
  @Output() error=new EventEmitter();
  selectedUser;
  currentPage=1;
  loading=false;

  constructor(private gitService:GitService,private route:Router) { }

  ngOnInit() {
    //console.log(this.total)
    this.getFollowers()
  }

  getFollowers(){
    this.loading=true;
    this.gitService.getFollowers(this.username).subscribe(
      (followers:[])=>{
        //console.log(followers)
        this.followers=followers;
        this.loading=false;
        //this.error.emit(403)
        //this.followerCount=followers.length;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

  navigateUser(username){
    //console.log(username)
    this.route.navigate(['/users',username])
  }

  getCurrentPage(event){
    this.currentPage=event;
    this.loading=true;
    this.gitService.getFollowers(this.username,event).subscribe(
      (followers:[])=>{
        //console.log(followers)
        this.followers=followers;
        this.loading=false;
        scrollTo(0,0);
        //this.followerCount=followers.length;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

}
