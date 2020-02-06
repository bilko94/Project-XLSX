const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.post('/load_data', (req,res) => {
    console.log(req.body);
    var ret = filereader(req.body.dir);
    console.log(ret);
    ret.then(result => {
        res.json(result);
    })
})


function filereader(dir){
    const dirpath = path.join(__dirname,dir);
    var arr = [];
    let promise = new Promise(resolve => {
        fs.readdir(dirpath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                var exploded_dir = dir.split('.');
                var compiled_dir = '.' + exploded_dir[2];
                var data = compiled_dir + '/' + file;
                arr.push(data);
                console.log(Parser(data));
            });
            resolve(arr);
        });
    })
    return (promise);
}
function Parser(dir){
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile(dir);//'./Excel files/Catherine Murray Skills.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var ret = {};
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
    })
    return(ret);
}
module.exports = router;