const fs = require("fs")
//detect the file name with extin 
function tk(test) {
    let test2 = test.split("").reverse().join("")
    let test3 = test2.slice(0, test2.indexOf("/"))
    let test4 = test3.split("").reverse().join("")
    if(test4[0] == "_"){
        return false;
    }
    else if(test4.search(".scss") == -1){
        return false;
    }
    else{
        return true;
    }
}
//take file size for purge command
function Tsize(dirContent,dirContent2){
    let blue = "\x1b[36m",def = "\x1b[0m"
    try {
        var stats = fs.statSync(`${dirContent2}`);
    } catch (err) {
        console.log(err);
    }
    if((stats.size / (1024*1024)) < 1){
        console.log(blue,`${dirContent} : ${Math.min(stats.size/1024).toFixed(2)}kb`,def)
    }
    else if((stats.size / (1024*1024)) > 1){
        console.log(blue,`${dirContent} : ${(Math.min(stats.size/(1024*1024)).toFixed(2))}MB`,def)
    }
}
module.exports = {
    tk,
    Tsize
}