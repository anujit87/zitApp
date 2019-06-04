import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userDetails;

  constructor(private route:Router) { }

  ngOnInit() {
    this.userDetails=JSON.parse( localStorage.getItem('userInfo'))
    //console.log(this.userDetails)
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['login'])
  }

}
