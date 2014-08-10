//Define the status bar controller
eyeApp.controller('StatusBarController', ['$scope','$rootScope',function ($scope,$rootScope) {
  
  //Init both of these to 0's
  $scope.rowNumber = 0;
  $scope.columnNumber = 0;
  
  // Listen to cursor changes and update the row and column numbers in teh status bar
  $rootScope.$on('update-line-column-count',$.proxy(function(eventInfo, cursorObj){
    $scope.rowNumber = cursorObj.row;
    $scope.columnNumber = cursorObj.column;
    $scope.$apply();
  }),$scope);
}]);