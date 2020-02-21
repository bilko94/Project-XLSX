const mongoose = require('mongoose');
const websocket = require('ws');
const wss = new websocket.Server({port:4003});
const connect = require('./API.js');

const API = new connect.API();

const uri = 'mongodb://localhost:5002/sandbox'; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
})

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log("first message");
        console.log(message);
        if (message.action == "populate"){
            API.populate(message.data);
            console.log("populating database with new format data...");
        }
        else if(message.action == "populateold"){
            API.parseOldFormatExcelFile(message.data);
            console.log("populating database with old format data...");
        }
    })
})

