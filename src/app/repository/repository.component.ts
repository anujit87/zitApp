import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GitService } from '../git.service';


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input() username:string;
  userRepos=[]
  totalRepos;
  @Output() repoCount:EventEmitter<number>=new EventEmitter<number>()
  repoList=[];
  currentPage:number=1;
  @Input() total;
  loading=false;
  @Output() error=new EventEmitter();

  constructor(private gitService:GitService) { }

  ngOnInit() {
    //console.log(this.total)
    if(this.username==localStorage.getItem('username')){
      this.getReposForLoggedInUser()
    }else{
      this.getUserRepos()
    }
    
  }

  getReposForLoggedInUser(){
    //let username=localStorage.getItem('username');
    //let password=atob(localStorage.getItem('password'));
    this.loading=true;
    this.gitService.getReposForLoggedInUser(this.username).subscribe(
      (repos:[])=>{
        //console.log(repos)
        this.userRepos=repos;      
        this.loading=false;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

  getUserRepos(){
    this.loading=true
    this.gitService.getUserRepos(this.username).subscribe(
      (repos:[])=>{
        console.log(repos)
        this.userRepos=repos;
        this.loading=false;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )  
  }

  getCurrentPage(event){
    this.currentPage=event;
    this.loading=true
    if(this.username==localStorage.getItem('username')){
      //let password=atob(localStorage.getItem('password'));
      this.gitService.getReposForLoggedInUser(this.username,event).subscribe(
        (repos:[])=>{
          this.userRepos=repos;
          this.loading=false;
          scrollTo(0,0)
        },error=>{
          //console.log(error.status)
          this.error.emit(error.status)
        }
      )
    }else{
      this.gitService.getUserRepos(this.username,event).subscribe(
        (repos:[])=>{
          this.userRepos=repos;
          this.loading=false;
          scrollTo(0,0);
        },error=>{
          //console.log(error.status)
          this.error.emit(error.status)
        }
      )
    }
  }


}
