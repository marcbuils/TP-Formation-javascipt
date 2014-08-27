var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

app.use(express.static(__dirname + '/dist'));

app.use('/dev/bower_components/', express.static(__dirname + '/bower_components/'));
app.get('/dev/todo.html', function (req, res) {
    fs.readFile(__dirname + '/www/todo.html', 'utf8', function (err, data) {
        var template;

        if (err) {
            res.send(404);
        }

        template = _.template(data);
        res.send(template({
            scripts: '<script src="bower_components/lodash/dist/lodash.js"></script>'
                + '<script src="bower_components/angular/angular.js"></script>'
                + '<script src="todo.js"></script>'
        }));
    });
});
app.use('/dev', express.static(__dirname + '/www'));

app.get(function (req, res) {
    res.redirect('dev/todo.html');
});

app.listen(3000);