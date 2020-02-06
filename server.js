const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

var connectedUsers = [];
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({limit: '50mb'}));

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
})

const xlsroute = require('./routes/load_data.js');

app.use('/load_data',xlsroute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});