const mongoose = require('mongoose');
const WebSocket = require('ws');
const newkey = require('./vault');
const newdb = require('./db');
//
const socket = new WebSocket.Server({ port: 4000 });
const socket2 = new WebSocket.Server({ port: 4001 });
const db = new newdb.db();
const vault = new newkey.encryptor();
const users = [ 
    { username:"liam", password: "mai-san"},
    { username:"ben", password: "bengay"},
    { username:"calvin", password: "harris"},
    { username:"bilko", password: "draven"},
    { username:"jayden", password: "surfsUp"},
];
//
socket2.on('connection', ws => {
    pinger(10, ws);
})
socket.on('connection', ws => {
    console.log('connected');
    ws.on('message', message => {
        console.log('new message ' + message);
        let res = vault.validate(message, users);
        console.log(res);
    if (res.status === 'valid') {
        console.log('data validated');
        ws.send(vault.package( {status:"valid"} ,users[0]));
        console.log('sent');
    }
    })
})
function pinger(ms,socket) { sleep(ms).then(() => { socket.send(Date.now() % 10000);pinger(ms,socket)})} 
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
