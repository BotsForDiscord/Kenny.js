const fs = require("fs");
const { join } = require('path')

let response;
const isDirectory = source => fs.lstat(source,(err,file)=>{return file.isDirectory();})
const dirs = fs.readdir(source,(err,dirs)=>{dirs.map(name => join(source, name)).filter(isDirectory)});


});
