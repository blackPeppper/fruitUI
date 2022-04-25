#!/usr/bin/env node
const process = require("process")
const sass = require("sass")
const fs = require('fs');
const func = require("./cli/name")
if (process.argv[2] == "init" || process.argv[2] == "-i") {
    let myData = `module.exports = {
    cssPath : "",
    outputStyle:"" //compressed or expanded
}`
    fs.writeFileSync('./fruit.config.js', myData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    if(process.argv[3]){
    let sassdata = `@import "./node_modules/furitcli/scss/basket"`
    fs.writeFileSync(`./${process.argv[3]}.scss`, sassdata, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    }
    let test = require('../../fruit.config.js')
    console.log("init filee craeted" + test)
    process.exit(0)
}
try {
    var config = require("../../fruit.config.js");
} catch {

}
//variable want to take from user
if (process.argv[2] == "watch" || process.argv[2] == "-w") {
    let watch = process.argv[3]
    let cssPath = config.cssPath
    var outputStyle;
    if (config.outputStyle) {
        outputStyle = config.outputStyle
    } else {
        outputStyle = "expanded"
    }
    let mytset = []
    const readAllFolder = (dirMain) => {
        const readDirMain = fs.readdirSync(dirMain);

        // console.log(dirMain);
        // console.log(readDirMain);

        readDirMain.forEach((dirNext) => {
            if (!fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
                if (func.tk(dirMain + "/" + dirNext)) {
                    mytset.push(dirMain + "/" + dirNext)
                }
            }
            if (fs.lstatSync(dirMain + "/" + dirNext).isDirectory()) {
                readAllFolder(dirMain + "/" + dirNext);
            }
        });
    };
    function takename(test) {
        let test2 = test.split("").reverse().join("")
        let test3 = test2.slice(0, test2.indexOf("/"))
        let test4 = test3.split("").reverse().join("")
        test4 = test4.slice(0, test4.search(".scss"))
        return test4
    }
    fs.watch(watch, { recursive: true }, (ev, fn) => {
        mytset = []
        console.clear()
        readAllFolder(watch)
        console.log(mytset)
        mytset.forEach(element => {
            console.log(element)
            let result = sass.compile(element, { style: outputStyle });
            fs.writeFile(`${cssPath}/${takename(element)}.css`, result.css.toString(), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("scss compile done !");
            });
        });
    })
}