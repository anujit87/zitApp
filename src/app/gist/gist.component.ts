import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GitService } from '../git.service';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.css']
})
export class GistComponent implements OnInit {
  gists=[];
  @Input() username:string;
  @Input() total;
  @Output() gistCount:EventEmitter<number>=new EventEmitter<number>()
  currentPage:number=1;
  totalGists:number;
  loading=false;
  @Output() error=new EventEmitter();

  constructor(private gitService:GitService) { }

  ngOnInit() {
    
      this.getGists();
    
    
  }

  
  
  getGists(){
    this.loading=true;
    this.gitService.getGists(this.username).subscribe(
      (gists:[])=>{
        //console.log(gists)
        this.gists=gists;
        this.loading=false;
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }

  getGistsFileName(data){
    if(Object.keys(data.files).length>0){
     
      return data.files[Object.keys(data.files)[0]].filename;
    }else{
      return ''
    }
  }

  getCurrentPage(event){
    this.currentPage=event;
    this.loading=true;
    this.gitService.getGists(this.username,event).subscribe(
      (gists:[])=>{
        this.gists=gists;
        this.loading=false;
        scrollTo(0,0);
      },error=>{
        //console.log(error.status)
        this.error.emit(error.status)
      }
    )
  }
}
