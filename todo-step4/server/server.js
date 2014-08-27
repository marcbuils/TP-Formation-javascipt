'use strict';

var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var api = require('./api');
var server;

server = {
    app: null,

    initialize: function () {
        var app = this.app = express();

        app.use(bodyParser.json());
        app.use(express.static(__dirname + '/../dist'));

        app.use('/dev', express.static(__dirname + '/../dev'));
        app.use('/api', api.app);

        app.use(function (req, res) {
            res.redirect('/dev/todo.html');
        });

        app.listen(3000);

        return this;
    }
};

Object.create(server).initialize();