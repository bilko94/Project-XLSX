import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-backend-form',
  templateUrl: './backend-form.component.html',
  styleUrls: ['./backend-form.component.scss']
})
export class BackendFormComponent implements OnInit {

  backendForm = new FormGroup({
    param: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  backendSubmit() {
    console.log("button pressed");    //  debug
  }

}
