import { Component, OnInit } from '@angular/core';
import * as data from '../sample_data.json';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'capco';
  dataObject = data as any;
  dataPerPage = 20;
  numberOfPages = 10;
  pageList = this.dataObject.default.slice(0, 20);
  listKeys = Object.keys(this.dataObject.default[0]);
  listValues = Object.values(this.pageList);
  currentPage = 1;

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.rowCount(1);
  }

  // Retrieving number of pages possible and passing current page value to row count so next and prev can be calculated
  numOfPages() {
    this.numberOfPages = this.getCountofPages();
    this.rowCount(this.currentPage);
  }

  // Calculating the number of pages possible
  getCountofPages() {
    if (this.dataPerPage && this.dataPerPage > 0) {
      return (Math.ceil(this.dataObject.default.length / this.dataPerPage));
    } else {
      this.dataPerPage = this.dataObject.default.length;
      return Math.ceil(this.dataObject.default.length);
    }
  }

  // reducing the count of current page so that data can be calculated accordingly
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.rowCount(this.currentPage);
  }

  // increasing the count of current page so that data can be calculated accordingly
  nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;

    }
    this.rowCount(this.currentPage);
  }

  /* taking in the current page and then calculating the beginning and ending data
for that particular page. eg: if data per page is 20 and page is 2 then it would display from 21 to 40. */
  rowCount(currentPage) {
    let begin;
    let end = begin + this.dataPerPage;
    if ( this.currentPage === 1) {
      begin = ((currentPage - 1) * this.dataPerPage);
      end = begin + this.dataPerPage;
    } else {
      begin = ((currentPage - 1) * this.dataPerPage) + 1;
      end = begin + this.dataPerPage - 1;
    }
    this.pageList = this.dataObject.default.slice(begin , end);
    this.listValues = this.dataObject.default.slice(begin , end);
  }

  // sending id and status to api
  postData(id, status) {
    this.http.post('www.google.com', {id, status});
  }
}
