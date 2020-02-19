import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() resultsAll?: Boolean;
  searchResults;    //define data type first in a class
  show: Boolean;

  searchForm = new FormGroup({
    param: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.show = false;
  }

  onSubmit() {
    console.log("button pressed");    //  debug

    //fetch query param
    //fetch from db
    //put into var: searchResults

    this.show = true;
  }

}
