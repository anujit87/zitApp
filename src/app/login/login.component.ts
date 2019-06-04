import { Component, OnInit } from '@angular/core';
import { GitService } from '../git.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private gitService:GitService,private route:Router,private toast:ToastrService) { }

  ngOnInit() {
  }

  login(){
    if(!this.username){
      this.toast.warning('Enter Username')
    }
    else if(!this.password){
      this.toast.warning('Enter Password')
    }else{
    
      this.gitService.login(this.username, this.password).subscribe(
        user => {
          //console.log(user)
          this.gitService.setUserInfoInLocalStorage(user);
          setTimeout(()=>{
            this.toast.success('Logged in Successfully')
          },500)
          this.route.navigate(['/user'])
        },
        err => {
          this.toast.error('Login Failed ! Please check your Credentials');
          this.username='';
          this.password='';
        }
      )
    }
  }

}
