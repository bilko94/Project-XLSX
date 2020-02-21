const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
let xlsdataModel = require('../models/xls_schema.js');

// router.post('/load_data', (req,res) => {
//     console.log(req.body);
//     var ret = filereader(req.body.dir);
//     var pos = 0;
//     ret.then(result => {
//         while (result[pos]){
//             console.log(pos);
//             data = explode_data(result, pos);
//             if (data === undefined){
//                 console.log(data+" "+pos);
//                 continue;
//             }
//             const Name = data["Your Details"][0].Name;
//             const Surname = data["Your Details"][0].Surname;
//             const job_title = data["Your Details"][0]["Job Title"];
//             if (data["Your Details"][0]["Team/BU/Office"])
//                 var Team_name = data["Your Details"][0]["Team/BU/Office"];
//             else
//                 var Team_name = "";
//             if (data["Your Details"][0]["Line_Manager"])
//                 var Line_Manager = data["Your Details"][0]["Line_Manager"];
//             else
//                 var Line_Manager = "";
//             const Back_end = data["Back_end"];
//             const Front_end = data["Front_end"];
//             const NTT_systems = data["NTT_systems"];

//             const newUser = new xlsdataModel({
//                 Name,
//                 Surname,
//                 job_title,
//                 Team_name,
//                 Line_Manager,
//                 Back_end,
//                 Front_end,
//                 NTT_systems
//             });
//             newUser.save().then( () => console.log('User '+Name+' added') )
//             .catch( err => res.status(400).json('Error: ' + err));
//             pos++;
//         }
//         res.json("Users Added");
//     })
// })


// function dataparser(result){
    //     var arr = [];
    //     var i = result.length;
    //     var pos = 1;
    //     while (pos < i)
    //         if (result[pos]["Your Details"].length)
    //             arr.push(result[pos++]["Your Details"]);
    //     return(arr);
    // }

module.exports.excess = class excess {

    explode_data(result, pos){
        var res = {};
        res = result[pos];
        return(res);
    }

    filereader(dir){
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
                        arr.push(this.Parser(data));
                    }
                    else console.log('invlaid file');
                });
                if (arr.length) resolve(arr);
                else resolve('no files or invalid dir');
            });
        })
        return (promise);
    }

    Parser(dir){
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

    parseOldFormatExcelFile(docName){
        var workbook = XLSX.readFile(docName);

        var user = {
            name : {type: String, default:''},
            surname : {type: String ,default:''},
            title : {type: String, default:''},
            teamName : {type: String, default:''},
            superior : {type: String, default:''},
            backEnd : [],
            frontEnd : [],
            NTTsystems : []
        };

        let details = workbook.Sheets[workbook.SheetNames[0]];
        user.name = details['A2'].v;
        user.surname = details['B2'].v;
        user.title = details['C2'].v;
        user.teamName = details['D2'].v;
        user.superior = details['E2'].v;
    
    	userArrs = Array(user.backEnd, user.frontEnd, user.NTTsystems);
    	for (k = 0; k < 3; k++)
    	{
    		let sheetArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[k + 1]], {header:1})
    		let bOther = 0;
    		sheetArr.forEach((row, index, arr) => {
    			if (row[0] == "Other") {
    				bOther = 1;
    				return;
    			}
    			let temp = {Other: bOther};
    			for ( i= 0 ; i < 3 ; i++ ) {temp[arr[0][i]] = (row[i] || row[i] == 0) ? row[i] : "NULL";}
    			if (row[0]) userArrs[k].push(temp);
    		});
    	}
    	userArrs.forEach((arrs) => {
    		arrs.slice(1);
    	})
    	return (user);
    }
}

// router.post('/purge',(req,res) => {
//     if (!req.body.token)
//         res.json('Forbbiden');
//     else if (req.body.token === 'admin'){
//         const uri = 'mongodb://localhost:5002/sandbox'; 
//         mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
//         mongoose.connection.db.dropDatabase(function () { console.log('purged');res.json('purged')});
//     } else { res.json('forbbiden')}
// })

// router.post('/get',(req,res) => {
//     xlsdataModel.find().exec().then(result => {res.json(result)})
// })



