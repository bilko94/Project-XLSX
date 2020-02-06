const mongoose = require('mongoose');
const schema = mongoose.Schema;
const data = new schema({
    name : {type: String,default:''},
    surname : {type: String,default:''},
    title : {type: String,default:''},
    teamName : {type: String,default:''},
    superior : {type: String,default:''},
    backEnd : {type: Array},
    frontEnd : {type: Array},
    NTTsystems : {type: Array}
});

const xlsdata = mongoose.model('xlsdata', data, 'xlsdata');

module.exports = xlsdata;
