var _ = require('lodash');
var uuid = require('node-uuid');
var express = require('express');
var todo;

todo = {
    WHITE_LIST: ['description', 'done', 'uuid'],
    todos: [{
        uuid: 'f35a0c68-c54a-42b1-b136-3719a9365f28',
        description: 'Ma première tache',
        done: true
    }, {
        uuid: '34fde8fd-79ea-4046-b8a2-7bc91f86f5a7',
        description: 'Ma seconde tache',
        done: false
    }],
    app: null,

    initialize: function () {
        var app = this.app = express();

        app.route('/')
            .get(_.bind(this.readAll, this))
            .post(_.bind(this.create, this));

        app.route('/:id')
            .get(_.bind(this.read, this))
            .put(_.bind(this.update, this))
            .delete(_.bind(this.delete, this));

        return this;
    },

    readAll: function (req, res) {
        res.send(this.todos);
    },

    read: function (req, res) {
        var todo = _.find(this.todos, { uuid: req.params.id });

        if (!todo) {
            res.status(400).end();
            return;
        }

        res.send(todo);
    },

    create: function (req, res) {
        var todo = _.extend({}, _.pick(req.body, this.WHITE_LIST), {
            uuid: uuid.v4()
        });

        this.todos.push(todo);
        res.status(201).send(todo);
    },

    update: function (req, res) {
        var todo = _.find(this.todos, { uuid: req.params.id });

        if (!todo) {
            res.status(400).end();
            return;
        }

        _.extend(todo, _.pick(req.body, this.WHITE_LIST));
        res.send(todo);
    },

    delete: function (req, res) {
        var todo = _.find(this.todos, { uuid: req.params.id });

        if (!todo) {
            res.status(400).end();
            return;
        }

        _.remove(this.todos, todo);
        res.send(todo);
    }
};

module.exports = Object.create(todo).initialize();