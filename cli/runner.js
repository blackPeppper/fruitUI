let mainpath= "./main";

const fs = require("fs")
const sass = require("sass")
const func = require("./name")
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
    test4 = test4.slice(0,test4.search(".scss"))
    return test4
}
fs.watch(mainpath, { recursive: true }, (ev, fn) => {
    mytset = []
    console.clear()
    readAllFolder(mainpath)
    console.log(mytset)
    mytset.forEach(element => {
        console.log(element)
        let result = sass.compile(element,{style: outputStyle});
        fs.writeFile(takename(element)+".css", result.css.toString(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("scss compile done !");
        });
    });
})
