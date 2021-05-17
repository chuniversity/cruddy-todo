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

//fs.writeFile
exports.create = (text, callback) => {
  counter.getNextUniqueId(function (err, data) {
    // if error

    // do stuff
    // else 
    var text = data
    items[id] = text;
    callback(null, { id, text });
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

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
