var app = angular.module('todoApp', []);

app.controller('TodoCtrl', ['$scope', function ($scope) {
    _.extend($scope, {
        todos: [{
            description: 'Ma première tache',
            done: true
        }, {
            description: 'Ma seconde tache',
            done: false
        }],

        add: function () {
            $scope.todos.push({
                description: $scope.description,
                done: false
            });
            $scope.description = '';
        },

        remove: function (todo) {
            _.remove($scope.todos, todo);
        },

        tasksRemaining: function() {
            return _.filter($scope.todos, { done: false });
        }
    });
}]);

