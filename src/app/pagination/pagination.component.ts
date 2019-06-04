import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  currentPage=1;
  @Input() pageSize;
  pages;
  @Input() total;
  @Output() pageNum = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    //console.log(this.total);
    //const noOfPages=Math.ceil(this.total/10);
    //this.pages=Array.from(Array(noOfPages),(x,i)=>i+1);
    this.updatePages()
  }

  setPage(page:number){
    this.currentPage=page
    this.pageNum.emit(this.currentPage);
    this.updatePages()
    
  }
  setNextPage(){
    if(this.currentPage<Math.ceil(this.total/this.pageSize)){
      this.currentPage=this.currentPage+1;
      this.pageNum.emit(this.currentPage);
      this.updatePages();
    }
    
  }
  setPrevPage(){
    if(this.currentPage>1){
      this.currentPage=this.currentPage-1; 
      this.pageNum.emit(this.currentPage);
      this.updatePages();
    }
    
  }

  updatePages(){
    const totalPages=Math.ceil(this.total/this.pageSize);
    let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (this.currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (this.currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = this.currentPage - 5;
                endPage = this.currentPage + 4;
            }
        }

        // create an array of pages to ng-repeat in the pager control
        this.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        //console.log(this.pages)
  }

}
