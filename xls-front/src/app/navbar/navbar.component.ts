import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { XlsService } from "../xls.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private socketService: XlsService) { }

  public sender = undefined;
  user = { username:"bilko", password:"dust2" };

  ngOnInit(): void {
  }

  clickevent() {
    const message = (<HTMLInputElement>document.getElementById('InputID')).value;
    console.log(message);
    if (message == "new format"){
      let data = { action: "populate", data: "C:\\Users\\Shane.Olivari\\Documents\\Code\\Project-XLSX\\backend\\Excel files"}
      console.log("start");
      this.sockTest(data, this.user);
    }
    // else if (message == "old format"){
    //   let data = { action: "populateold", data: "RandD Skills Matrix - Evan Christians LB.xlsx"}
    //   this.sender.send(data);
    // }

  }

  sockTest(data, user){
    console.log("here1");
    return this.socketService.sendReq(data, [user]);
  }

  goToBooks() {
    this.router.navigate(['bookmarks']);
  }

}
