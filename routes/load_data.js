const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.post('/load_data', (req,res) => {
    console.log(req.body);
    var ret = filereader(req.body.dir);
    ret.then(result => {
        console.log(result);
        if (result !== 'no files or invalid dir'){
            var compiled = dataparser(result); 
            res.json(compiled);
        } else res.json('no files or invalid dir');
    })
})

function dataparser(result){
    var arr = [];
    var i = result.length;
    var pos = 1;
    while (pos < i)
        if (result[pos]["Your Details"].length)
            arr.push(result[pos++]["Your Details"]);
    return(arr);
}

function filereader(dir){
    const dirpath = path.join(__dirname,dir);
    var arr = [];
    let promise = new Promise(resolve => {
        fs.readdir(dirpath, function (err, files) {
            if (err) {
                return;
            }
            files.forEach(function (file) {
                var exploded_dir = dir.split('.');
                var compiled_dir = '.' + exploded_dir[2];
                var data = compiled_dir + '/' + file;
                if (file.split('.')[file.split('.') .length - 1] === 'xlsx'){
                    arr.push(Parser(data));
                    // console.log(Parser(data));
                }
                else console.log('invlaid file');
            });
            console.log(arr.length);
            if (arr.length) resolve(arr);
            else resolve('no files or invalid dir');
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