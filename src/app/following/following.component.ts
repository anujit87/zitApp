import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { GitService } from '../git.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following;
  followingCount;
  @Input() username:string;
  @Input() total;
  currentPage=1;
  loading=false;
  @Output() error=new EventEmitter();

  constructor(private gitService:GitService) { }

  ngOnInit() {
    this.getFollowing()
  }

  getFollowing(){
    this.loading=true;
    this.gitService.getFollowing(this.username).subscribe(
      (following:Array<{}>)=>{
        //console.log(following)
        this.following=following;
        this.loading=false;
        //this.followingCount=following.length
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

  getCurrentPage(event){
    this.currentPage=event;
    this.loading=true;
    this.gitService.getFollowing(this.username,event).subscribe(
      (following:Array<{}>)=>{
        //console.log(following)
        this.following=following;
        this.loading=false
        //this.followingCount=following.length
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

}
