import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() {}

  heading = "Skills Portal";
  sock = '';
  ngOnInit(): void {
    const conn = new WebSocket('ws://localhost:4001');
    conn.onmessage = (Message) => {
      this.sock = Message.data;
    }
  }

}
