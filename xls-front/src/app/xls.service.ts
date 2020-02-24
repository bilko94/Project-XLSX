import { Injectable } from '@angular/core';
import { vaultClass } from './vault';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class XlsService {

  constructor() { }

  sendReq(req, user){
    const conn = new WebSocket('ws://localhost:4000');
    const vault = new vaultClass();
    console.log(user);
    console.log(req);
    let request = vault.package(req, user);
    return new Promise((resolve) => {
    conn.onopen = () => {
      conn.send(request);
        conn.onmessage = (message) => {
          console.log("now at xls.service.ts socket set");
          let res = vault.validate(message.data, [user]);
          if (res.status === 'valid')
            resolve(res.request);
          else resolve(res);
        }
      };
    })
  }
}
