const mongoose = require('mongoose');
const WebSocket = require('ws');
const newkey = require('./vault');
const newdb = require('./db');
const UserModel = require('./models/xls_schema');
//
const socket = new WebSocket.Server({ port: 4000 });
const socket2 = new WebSocket.Server({ port: 4001 });
const db = new newdb.db();
const vault = new newkey.encryptor();
const uri = 'ATLAS_URI=mongodb://localhost:5002/sandbox'; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);
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
            console.log('data validated at ' + Date.now() % 10000);
            console.log('proccessing request....');
            let request = locate(res.request);
            console.log('wrapping package....');
            request.then(result => {
                let package = vault.package( result , res.recipient );
                ws.send(package);
                console.log('sent');
            });
        } else {
            console.log('data error');
            ws.send(JSON.stringify(res));
            console.log('sent');
        }
    })
})
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
});
// socket.on('close', () => { console.log('closed request resolved')});
function pinger(ms,socket) { sleep(ms).then(() => { socket.send(Date.now() % 10000);pinger(ms,socket)})} 
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
//
function create(req){
    const Name = 'CYKO' + Date.now() % 10000;
    const Surname = "lkrielin" + Date.now() % 10000;
    let newUser = new UserModel({
        Name,
        Surname
    });
    newUser.save().then(() => { console.log('added') });
    return { actionStatus:200, res:'added'};
}
function purge(req){
    mongoose.connection.db.dropDatabase();
    console.log('purged');
    return { actionStatus:200, res:'removed'};
}
function edit(req){
    return { actionStatus:200, res:'added'};
}
function locate(req){
    return new Promise((resolve) => UserModel.find().exec().then((docs) => {
        resolve(docs);
    }))
}
