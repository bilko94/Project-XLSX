const mongoose = require('mongoose');

const schema = mongoose.Schema;
const data = new schema({
    Name : {type: String,default:''},
    Surname : {type: String,default:''},
    job_title : {type: String,default:'why the fuck'},
    Team_name : {type: String,default:''},
    Line_Manager : {type: String,default:''},
    Back_end : {type: Array},
    Front_end : {type: Array},
    NTT_systems : {type: Array}
});

const xlsdata = mongoose.model('xlsdata', data, 'xlsdata');

module.exports = xlsdata;
