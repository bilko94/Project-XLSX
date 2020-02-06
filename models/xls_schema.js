const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const data = new Schema({
    testdata:{
      type:String,
      default:''
    }
  }, {
    timestamps: true,
  });

const xlsdata = mongoose.model('xlsdata', data, 'xlsdata');

module.exports = xlsdata;
