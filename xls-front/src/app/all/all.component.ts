import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  showAll: Boolean;

  constructor() { }

  ngOnInit(): void {
    this.showAll = true;
  }

}
