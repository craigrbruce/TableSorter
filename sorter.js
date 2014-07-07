angular.module('columnSorter', [])
    .factory("mediator", [
        '$rootScope', function ($rootScope) {
            var SORT_SELECTED = "event:SORT_SELECTED";

            function subscribeEvent(event, $scope, handler) {
                return $scope.$on(event, function (sender, args) {
                    handler(args);
                });
            }

            function notifyEvent(event, object) {
                $rootScope.$broadcast(event, object);
            }

            return{
                subscribeEvent: subscribeEvent,
                notifyEvent: notifyEvent,
                SORT_SELECTED: SORT_SELECTED
            };

        }
    ])
    .directive("sorter", ['mediator',
        function (mediator) {
            return{
                restrict: 'E',
                replace: true,
                transclude: true,
                template: "<a href ng-click=\"sortColumn()\"> {{columnTitle}} <i ng-class=\"orderByIcon()\" ng-show=\"showSortIcon == true\"></i></a>",
                scope: {
                    sort: "=",
                    sortBy: "@",
                    columnTitle: "@",
                    upIcon: "@",
                    downIcon: "@"
                },
                link: function ($scope) {
                    $scope.orderBy = "DESC";
                    $scope.showSortIcon = false;

                    function toggleOrderBy() {
                        $scope.orderBy = $scope.orderBy === "ASC" ? "DESC" : "ASC";
                    }

                    $scope.sortColumn = function () {
                        var currentSort = {sortBy: $scope.sortBy, orderBy: $scope.orderBy};
                        mediator.notifyEvent(mediator.SORT_SELECTED, currentSort);
                        $scope.sort(currentSort);
                        toggleOrderBy();
                    };

                    $scope.orderByIcon = function () {
                        return $scope.orderBy === "ASC" ? $scope.upIcon : $scope.downIcon;
                    };

                    mediator.subscribeEvent(mediator.SORT_SELECTED, $scope, function (currentSort) {
                        $scope.showSortIcon = !currentSort ?
                            false :
                            currentSort.sortBy === $scope.sortBy;
                    });
                }
            };
        }]);
