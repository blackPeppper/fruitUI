#!user/bin/env node

// import fs from "fs";
// import { createSpinner } from "nanospinner";
// import chalk from "chalk";
// import sassCompiler from "./sassCompiler.js";
// import fruit from './fruit.js';
// const fruit = require('fruit.js');
const sassCompiler = require('./sassCompiler.js');
const fruit = require('./fruit.js');
const fs = require('fs');
const {createSpinner} = require('nanospinner');
var spinner = createSpinner("watching").start();


let varsassPath = fruit.srcPath;
let varcssPath = fruit.cssPath;
// let varsassPath = "./main.scss";
// let varcssPath = "./i.css";

fs.watch(varsassPath,{ interval: 100 },(curr, prev) => {
    // start the timer
    try {
      let timeone = performance.now();
      sassCompiler(varcssPath, varsassPath);
      // end the timer
      let timetow = performance.now();
      var time = Math.floor(timetow - timeone);
      console.clear();
      spinner.success({ text: `done in ${time} ms` });
    } catch (e) {
      console.clear();
      spinner.error({ text: ` ${e.stack}` });
    }
  }
);
