'use strict';

var express = require('express');
var todo = require('./api/todo');
var api;

api = {
    app: null,

    initialize: function () {
        var app = this.app = express();

        app.use('/todo', todo.app);

        return this;
    }
};

module.exports = Object.create(api).initialize();