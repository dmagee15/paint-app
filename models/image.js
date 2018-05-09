'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	id: String,
	data: String
});

module.exports = mongoose.model('Image', Image);