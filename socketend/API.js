const mongoose = require('mongoose');
const funcs = require('./Load_data');
let xlsdataModel = require('./models/xls_schema.js');
const api = new funcs.excess();

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("API connection established");
})

module.exports.API = class API {

    populate(dir) {
        console.log(dir);
        var ret = api.filereader(req.body.dir);
        var pos = 0;
        ret.then(result => {
            while (result[pos]){
                console.log(pos);
                data = api.explode_data(result, pos);
                if (data === undefined){
                    console.log(data+" "+pos);
                    continue;
                }
                const Name = data["Your Details"][0].Name;
                const Surname = data["Your Details"][0].Surname;
                const job_title = data["Your Details"][0]["Job Title"];
                if (data["Your Details"][0]["Team/BU/Office"])
                    var Team_name = data["Your Details"][0]["Team/BU/Office"];
                else
                    var Team_name = "";
                if (data["Your Details"][0]["Line_Manager"])
                    var Line_Manager = data["Your Details"][0]["Line_Manager"];
                else
                    var Line_Manager = "";
                const Back_end = data["Back_end"];
                const Front_end = data["Front_end"];
                const NTT_systems = data["NTT_systems"];
        
                const newUser = new xlsdataModel({
                    Name,
                    Surname,
                    job_title,
                    Team_name,
                    Line_Manager,
                    Back_end,
                    Front_end,
                    NTT_systems
                });
                newUser.save().then( () => console.log('User '+Name+' added') )
                .catch( err => res.status(400).json('Error: ' + err));
                pos++;
            }
            res.json("Users Added");
        })
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
