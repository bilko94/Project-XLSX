const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({limit: '50mb'}));
// app.use(express.bodyParser({limit: '50mb'}));

const uri = 'mongodb://localhost:5002/sandbox'; 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to mongoDB");
})

const load_data = require('./routes/load_data.js');
app.use('/data',load_data);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
