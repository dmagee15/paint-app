'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	title: String,
	id: Number,
	numposts: Number,
	lastpost: String,
    posts: [],
    users: []
});

module.exports = mongoose.model('Image', Image);