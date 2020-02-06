const router = require('express').Router();
const xlsmodels = require('../../project xls/models/xls_schema.js');
const xldocreader = require('xlsx');
const xlmParser = require()
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
                arr.push(file);
            });
            resolve(files);
        });
    })
    return (promise);
}
module.exports = router;