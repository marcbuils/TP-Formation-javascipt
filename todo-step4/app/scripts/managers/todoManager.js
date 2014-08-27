var _ = require('lodash');
var manager = null;
var Client = require('node-rest-client').Client;
var events = require('events');

manager = {
    BASE_URL: window.location.origin + '/api/todo',
    data: {
        todos: []
    },
    client: null,
    eventEmitter: null,

    initialize: function () {
        this.client = new Client();
        this.eventEmitter = new events.EventEmitter();

        this.client.get(this.BASE_URL, _.bind(function(data){
            this.data.todos = JSON.parse(data);
            this.eventEmitter.emit('update');
        }, this));

        return this;
    },

    on: function (event, cb) {
        this.eventEmitter.on(event, cb);
    },

    add: function (todo) {
        this.client.post(this.BASE_URL,
            { data: todo, headers: { 'Content-Type': 'application/json' }  },
                _.bind(function(data){
                this.data.todos.push(JSON.parse(data));
                this.eventEmitter.emit('update');
        }, this));

        return this;
    },

    remove: function (todo) {
        this.client.delete(this.BASE_URL + '/' + todo.uuid,  _.bind(function(){
            _.remove(this.data.todos, todo);
            this.eventEmitter.emit('update');
        }, this));

        return this;
    },

    update: function (todo) {
        this.client.put(this.BASE_URL + '/' + todo.uuid,
            { data: todo, headers: { 'Content-Type': 'application/json' }  },
            _.bind(function(data){
                var oldTodo = _.find(this.data.todos, { uuid: data.uuid });
                _.extend(oldTodo, data);
                this.eventEmitter.emit('update');
        }, this));

        return this;
    },

    tasksRemaining: function () {
        return _.filter(this.data.todos, { done: false })
    }
};

module.exports = Object.create(manager).initialize();
