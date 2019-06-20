var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://user:user123@ds241097.mlab.com:41097/mongotest');

module.exports = {mongoose};