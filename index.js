let async = require('async');
let geodist = require('geodist')
let config = require('./config');
var locationsJson = require('./locations');
var corrrectLatLng = [];
var isDist = false;


async.forEachOf(locationsJson, function (value, key, callback) {
    let currentValue = value;
    let nextValue = locationsJson[key+1];
    let previousValue = locationsJson[key-1];
    let dist = geodist(currentValue, nextValue, {limit: config.ditanceLimit});
    if (dist){
        locationsJson.splice(key, 1);
    }
    callback();
}, function(err) {
    if( err ) {
        console.log('Error processing  request_pending trips request.');
    } else {
        console.log("Final Array :", locationsJson);
    }
});
