const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

/*
for callback it's err first
Todo.readOne(req.params.id, (err, todo) => {
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.sendStatus(404);
  }
})
*/

// var id = counter.getNextUniqueId();
// items[id] = text;
// callback(null, { id, text });
/*
  create
    1) should create a new file for each todo
    2) should use the generated unique id as the filename
    3) should only save todo text contents in file
    4) should pass a todo object to the callback on success


//fs.writeFile - fs.writeFile( file, data, options, callback )
options: It is an string or object that can be used to specify optional parameters that will affect the output. It has three optional parameter:
encoding: It is a string value that specifies the encoding of the file. The default value is ‘utf8’.
mode: It is an integer value that specifies the file mode. The default value is 0o666.
flag: It is a string value that specifies the flag used while writing to the file. The default value is ‘w’.

The fs.writeFile() method is used to asynchronously write the specified data to a file.
By default, the file would be replaced if it exists.
*/
exports.create = (text, callback) => {
  //take the text input write a file to database/location on server

  counter.getNextUniqueId((err, id) => { //data = zeroPaddedNumber(id)
    // if error
    if (err) {
      console.log('error in exports.create - index.js');
    } else {
      let filePath = path.join(exports.dataDir, `${id}.txt`);
      console.log(filePath)
      fs.writeFile(filePath, text, function(error) {
        if (error) {
          console.log('error in .create() index.js: ', error);
        } else {
          callback(null, { id, text }); //example found in server.js ln 23  - req.body.todoText
        }
      });
    }
  });

};
//provide the return of arguments for future function (callback) to use

//fs.readdir
exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

//fs.readFile
exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

//fs.writeFile
exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

//fs.unlink
exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////
// =>  ./
exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
