import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  detailsForm = new FormGroup({
    param: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  detailsSubmit() {
    console.log("button pressed");    //  debug
  }

}
