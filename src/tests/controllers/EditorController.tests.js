describe('EditorController', function() {
  var scope;
  beforeEach(angular.mock.module('eyeApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller){
    //create an empty scope
    scope = $rootScope.$new();
    //declare the controller and inject our empty scope
    $controller('EditorController', {$scope: scope});
  }));
  // tests start here
  it('should have variable openedDocuments length as 0', function(){
      expect(scope.openedDocuments.length).toEqual(0);
  });
});
