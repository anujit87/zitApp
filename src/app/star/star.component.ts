import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GitService } from '../git.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() username:string;
  starred;
  starredCount;
  loading=false;
  currentPage;
  @Output() starsCount:EventEmitter<number>=new EventEmitter<number>();
  @Output() error=new EventEmitter();

  constructor(private gitService:GitService) { }

  ngOnInit() {
    this.loading=true
    this.gitService.getStarred(this.username).subscribe(
      (response:[])=>{
        this.starredCount=response.length;
        this.starsCount.emit(response.length)
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
    this.getStarred()
    
  }

  getStarred(){
    this.gitService.getStarredPagination(this.username).subscribe(
      (starred:[])=>{
        this.starred=starred
        //console.log(starred.length)
        //this.starredCount=starred.length
        //this.starsCount.emit(starred.length)
        this.loading=false;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

  getCurrentPage(event){
    this.currentPage=event;
    this.loading=true;
    this.gitService.getStarredPagination(this.username,event).subscribe(
      (response:[])=>{
        this.starred=response;
        this.loading=false;
        scrollTo(0,0);
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

}
