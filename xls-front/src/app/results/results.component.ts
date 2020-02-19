import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() showAll?: Boolean;
  @Input() data;    //define data type first in a class

  constructor() { }

  ngOnInit(): void {
    //method to see if showAll var is true --> will then fetch all users
  }


}
