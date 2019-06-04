import { Component, OnInit} from '@angular/core';
import { GitService } from '../git.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchStr:string;
 
  constructor(private gitService:GitService,private toast:ToastrService,private route:Router) { }

  ngOnInit() {
  }

  searchUser(event){
    if (event.keyCode === 13) {
      //console.log(this.searchStr)
      this.gitService.searchUser(this.searchStr).subscribe(
        (user:any) => {
          if(user.status===200){
            //console.log(user.body)
            this.route.navigate(['/users',user.body.login])
          }
          
        },
        error => {
          if(error.status===404){
            this.toast.error('Invalid Username');
            this.searchStr=''
          }
        }
      )
    }
  }

}
