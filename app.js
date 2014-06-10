angular.module('demoApp', ["columnSorter"])
    .controller("demoCtrl", ["$scope", function($scope){

        $scope.getFoobars = function(params){
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
        };

    }]);