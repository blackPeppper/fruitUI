#!/usr/bin/env node
const process = require("process")
const sass = require("sass")
const fs = require('fs');

if (process.argv[2] == "init") {
    let myData = `module.exports = {
    cssPath : "",
    scssPath:"${process.argv[3]}.scss",
    outputStyle:"" //compressed or expanded
}`
    fs.writeFileSync('./fruit.config.js', myData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    let sassdata = `@import "./node_modules/furitcli/scss/basket"`
    fs.writeFileSync(`./${process.argv[3]}.scss`, sassdata, err => {
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
//variable want to take from user
let cssPath = config.cssPath
let scssPath  = config.scssPath
var outputStyle;
if(config.outputStyle){
    outputStyle = config.outputStyle
}else{
    outputStyle = "expanded"
}
const result = sass.compile(scssPath,{style: outputStyle});
fs.writeFile(cssPath, result.css, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("scss compile done !");
});