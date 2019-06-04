import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() status;

  constructor(private location:Location) { }

  ngOnInit() {
    //console.log(this.location.path())
  }

  goBack(){
    
    this.location.back()
  }

}
