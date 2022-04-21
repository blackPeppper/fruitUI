#!/usr/bin/env node
const process = require("process")
const sass = require("sass")
const fs = require('fs');
let myData = `module.exports = {
    cssPath : "",
    scssPath:"",
    outputStyle:"" //compressed or expanded
}`
if (process.argv[2] == "init") {
    fs.writeFileSync('./fruit.config.js', myData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    let test=require('../../fruit.config.js')
    console.log("init filee craeted" + test)
    process.exit(0)
}
try{
    var config = require("../../fruit.config.js");
}catch{
    
}
console.log(config)
//variable want to take from user
let cssPath = config.cssPath
let scssPath  = config.scssPath
var outputStyle;
if(config.outputStyle){
    outputStyle = config.outputStyle
}else{
    outputStyle = "expanded"
}
console.log(outputStyle)
sass.render({
    file: scssPath,  outputStyle: outputStyle
}, function (err, result) {
    fs.writeFile(cssPath, String(result.css), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("scss compile done !");
    });
});
