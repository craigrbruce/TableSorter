angular.module('demoApp', ["columnSorter"])
    .controller("demoCtrl", ["$scope", function ($scope) {
        $scope.sortActions = [];

        $scope.getFoobars = function (params) {
            //call your API with the params
            //which should be (e.g)
            /*
             * {
             *   orderBy : "ASC",
             *   sortBy : "name"
             * }
             * */

            //return myService.getFoobars(params)
            //.then(success, error);

            $scope.sortActions.push({
                number: $scope.sortActions.length + 1,
                message: ' you are ordering by ' + params.orderBy + " and sorting on " + params.sortBy
            });


        };

    }]);