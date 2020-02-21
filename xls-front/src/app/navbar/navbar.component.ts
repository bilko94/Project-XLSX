import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as socket from '../../../../socketend/API.js';

let connection = new socket.API();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  public sender = undefined;

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    const url = "ws://localhost:4003";
    let socket = new WebSocket(url);
    socket.onopen = () => {
      this.sender = socket;
      console.log("socket connected");
    }
    socket.onmessage = function (message) {
      console.log('front end message(reply)');
      console.log(message);
    }.bind(this)
  }

  clickevent() {
    const message = (<HTMLInputElement>document.getElementById('InputID')).value;
    console.log(message);
    if (message == "new format"){
      let data = { action: "populate", data: "C:\\Users\\Shane.Olivari\\Documents\\Code\\Project-XLSX\\backend\\Excel files"}
      this.sender.send(data);
    }
    else if (message == "old format"){
      let data = { action: "populateold", data: "RandD Skills Matrix - Evan Christians LB.xlsx"}
      this.sender.send(data);
    }

  }

  goToBooks() {
    this.router.navigate(['bookmarks']);
  }

}
