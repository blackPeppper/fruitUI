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
module.exports = {
    tk
}