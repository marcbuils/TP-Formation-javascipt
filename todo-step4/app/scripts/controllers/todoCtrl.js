var _ = require('lodash');
var todoManager = require('../managers/todoManager');

module.exports = ['$scope', function ($scope) {
    _.extend($scope, {
        dataTodo: todoManager.data,

        add: function () {
            todoManager.add({
                description: $scope.description,
                done: false
            });
            $scope.description = '';
        },

        remove: function (todo) {
            todoManager.remove(todo);
        },

        update: function (todo) {
            todoManager.update(todo);
        },

        tasksRemaining: function() {
            return todoManager.tasksRemaining();
        }
    });

    todoManager.on('update', function () {
        $scope.$apply();
    });
}];

