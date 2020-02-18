//This file just takes an xlsx file and converts it into an obj with a format.

var data = Parser();
// console.log(data);

function Parser(){
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile('./Excel files/Shane Skills.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var ret = {};
    //break the file into sheets and format each one seperately
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        var obj = {};
        for (a in worksheet) {
            if (a[0] === '!')  continue;
            var tt = 0;
            for (var i = 0; i < a.length; i++) {
                if (!isNaN(a[i])) {
                    tt = i;
                    break;
                }
            };
            var col = a.substring(0,tt);
            var row = parseInt(a.substring(tt));
            var value = worksheet[a].v;
    
            if (row == 1 && value) {
                headers[col] = value;
                continue;
            }
            if (!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        data.shift();
        data.shift();
        ret[y] = data;
        // console.log(ret);
    })
    // console.log(ret);
    return(ret);
}