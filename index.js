#!/usr/bin/env node
const process = require("process")
const sass = require("sass")
const fs = require('fs');
const func = require("./cli/name")
var reset = "\x1b[0m"
var green = "\x1b[32m"
// init condition to writr file named (fruit.config.js)
//take a command line parameter
if (process.argv[2] == "init" || process.argv[2] == "-i") {
    let myData = `module.exports = {
    cssPath : "css",
    outputStyle:"", //compressed or expanded
    //purge css command
    //content: ['!(node_modules)**/*.{html,js,php}'],
    //css: ['**/*.css'],
    //buildOutput:"./build"//purge output
}`
    fs.writeFileSync('./fruit.config.js', myData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
    //craete the scss file on init with command line parameter for the name 
    if (process.argv[3]) {
        let sassdata = `@import "./node_modules/furitcli/scss/basket"`
        fs.writeFileSync(`./${process.argv[3]}.scss`, sassdata, err => {
            if (err) {
                console.error(err)
                return
            }
            //file written successfully
        })
    }
    console.log("init file created")
    process.exit(0)
}
try {
    var config = require("../../fruit.config.js");
} catch (e) {
    console.log(e)
}
//the watcher code for sass compile
if (process.argv[2] == "watch" || process.argv[2] == "-w") {
    let watch = process.argv[3]
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
        //calc time
        let timeone = performance.now();
        let cssPath = config.cssPath
        var outputStyle;
        if (config.outputStyle) {
            outputStyle = config.outputStyle
        } else {
            outputStyle = "expanded"
        }
        mytset = []
        console.clear()
        readAllFolder(watch)
        mytset.forEach(element => {
            let result = sass.compile(element, { style: outputStyle });
            fs.writeFile(`${cssPath}/${takename(element)}.css`, result.css.toString(), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
        let timetow = performance.now();
        // timer calculator
        var time = Math.floor(timetow - timeone);
        if (time > 1000) {
            time = `${Math.max(Math.floor(timetow - timeone) / 1000)} seconds`;
        } else {
            time = `${Math.floor(timetow - timeone)} ms`;
        }
        //
        console.clear();
        console.log(green, `done in ${time}`, reset)
    })
}



// purge css command 
if (process.argv[2] == "build" || process.argv[2] == "-b") {
    const { exec } = require("child_process");
    exec(`npx purgecss --config ./fruit.config.js --output ${config.buildOutput}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(green, `done`, reset);
    });
}