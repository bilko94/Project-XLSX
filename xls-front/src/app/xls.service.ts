import { Injectable } from '@angular/core';
import { vaultClass } from './vault';

@Injectable({
  providedIn: 'root'
})
export class XlsService {

  constructor() { }

  sendReq(req, user){
    const conn = new WebSocket('ws://localhost:4000');
    const vault = new vaultClass();
    let request = vault.package(req, user);
    console.log(request);
    conn.onopen = () => {
      conn.send(request);
    }
    console.log( 'sending..........' );
    
  }
}
