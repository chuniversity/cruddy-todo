const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => { //writeCounter => callback
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

/* Public API - Fix this function //////////////////////////////////////////////
From gLearn:
Unique Identifier
All todo entries are identified by an auto-incrementing id. Currently, that id is a counter stored in memory. Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts. Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.

Commit your progress: "Complete getNextUniqueId"

mocha test results:
  getNextUniqueId
    1) should use error first callback pattern
    2) should give an id as a zero padded string
    3) should give the next id based on the count in the file
    4) should update the counter file with the next value
*/

exports.getNextUniqueId = (callback) => {
  readCounter(function (err, id) {
    if (err) {
      console.log('read error ', err);
    } else {
      writeCounter(id + 1, function (err, id) {
        if (err) {
          console.log('write error ', err);
        } else {
          callback(err, zeroPaddedNumber(id));
        }
      });
    }
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
