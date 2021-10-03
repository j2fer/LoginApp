var express = require('express');
const fs = require('fs');



function readFile (filePath) {
    let rawdata = fs.readFileSync(filePath);
    return JSON.parse(rawdata);
}




function writeFile(filePath, data) {
    fs.writeFile (filePath, JSON.stringify(data, null, 2), function(err) {
        if (err) {
            throw err;
        } else {
            console.log('complete');
        }
    });
}



module.exports = {
    "readFile": readFile,
    "writeFile": writeFile
};