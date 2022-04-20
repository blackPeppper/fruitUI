#!user/bin/env node
const process = require("process")
const fs = require('fs');
if (process.argv[2] == "init") {
    fs.writeFile('../../../config.json', "test", err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    console.log("init file craeted")
    process.exit(0)
}

