module.exports.db = class db {
    add(req){ console.log(req); return('result add'); }
    purge(req){ console.log(req); return('result purge'); }
    ///
    edit(req){ console.log(req); return('result edit'); }
}