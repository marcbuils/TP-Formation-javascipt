var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');

var WHITE_LIST = ['description', 'done', 'uuid'];
var todos = [{
    uuid: 'f35a0c68-c54a-42b1-b136-3719a9365f28',
    description: 'Ma première tache',
    done: true
}, {
    uuid: '34fde8fd-79ea-4046-b8a2-7bc91f86f5a7',
    description: 'Ma seconde tache',
    done: false
}];

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));
app.use('/dev', express.static(__dirname + '/../dev'));

app.get('/api/todo/list', function (req, res) {
    res.send(todos);
});

app.get('/api/todo/:id', function (req, res) {
    var todo = _.find(todos, { uuid: req.params.id });

    if (!todo) {
        res.status(400).end();
        return;
    }

    res.send(todo);
});

app.post('/api/todo', function (req, res) {
    var todo = _.extend({}, _.pick(req.body, WHITE_LIST), {
        uuid: uuid.v4()
    });

    todos.push(todo);
    res.status(201).send(todo);
});

app.put('/api/todo/:id', function (req, res) {
    var todo = _.find(todos, { uuid: req.params.id });

    if (!todo) {
        res.status(400).end();
        return;
    }

    _.extend(todo, _.pick(req.body, WHITE_LIST));
    res.send(todo);
});

app.delete('/api/todo/:id', function (req, res) {
    var todo = _.find(todos, { uuid: req.params.id });

    if (!todo) {
        res.status(400).end();
        return;
    }

    _.remove(todos, todo);
    res.send(todo);
});

app.use(function (req, res) {
    res.redirect('/dev/todo.html');
});

app.listen(3000);