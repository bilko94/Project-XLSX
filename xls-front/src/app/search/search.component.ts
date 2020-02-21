import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { XlsService } from "../xls.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  user = { username:"liam", password:"mai-san" };

  @Input() resultsAll?: Boolean;
  searchResults;    //define data type first in a class
  show: Boolean;
  searchForm = new FormGroup({
    param: new FormControl('', Validators.required)
  });

  constructor(private socketService: XlsService) { }

  ngOnInit(): void {
    this.show = false;
  }

  onSubmit() {
    console.log("button pressed");    //  debug
    //fetch query param
    //fetch from db
    //put into var: searchResults
    const data = { action:"find", data:"users" };
    this.sockTest(data, this.user).then((res) => { console.log(res); });
    this.show = true;
  }
  // socket test
  sockTest(data, user){
    return this.socketService.sendReq(data, user);
  }

}
