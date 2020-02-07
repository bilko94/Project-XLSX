const router = require('express').Router();
const path = require('path');
const fs = require('fs');
let xlsdataModel = require('../models/xls_schema.js');

router.post('/load_data', (req,res) => {
    console.log(req.body);
    var ret = filereader(req.body.dir);
    var pos = 0;
    ret.then(result => {
        while (result[pos++]){
            console.log("adding");
            data = explode_data(result, pos);
            // console.log(data["Your Details"][0].Name);
            // console.log(data["Back_end"]);
            if (data === undefined)
                continue;
            
            const Name = data["Your Details"][0].Name;
            const Surname = data["Your Details"][0].Surname;
            const Job_title = data["Your Details"][0].Job_title;
            if (data["Your Details"][0].Team_Name)
                var Team_Name = data["Your Details"][0].Team_Name;
            else
                var Team_Name = "";
            if (data["Your Details"][0].Line_Manager)
                var Line_Manager = data["Your Details"][0].Line_Manager;
            else
                var Line_Manager = "";
            const Back_end = data["Back_end"];
            const Front_end = data["Front_end"];
            const NTT_systems = data["NTT_systems"];

            const newUser = new xlsdataModel({
                Name,
                Surname,
                Job_title,
                Team_Name,
                Line_Manager,
                Back_end,
                Front_end,
                NTT_systems
            });
            newUser.save().then( () => console.log('User added') )
            .catch( err => res.status(400).json('Error: ' + err));
        }
        res.json("Users Added");
    })
})

function explode_data(result, pos){
    var res = {};
    res = result[pos];
    return(res);
}

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
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                var exploded_dir = dir.split('.');
                var compiled_dir = '.' + exploded_dir[2];
                var data = compiled_dir + '/' + file;
                // console.log(file.split('.')[file.split('.') .length - 1]);
                if (file.split('.')[file.split('.') .length - 1] === 'xlsx')
                    arr.push(Parser(data));
                else console.log('invlaid file')
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