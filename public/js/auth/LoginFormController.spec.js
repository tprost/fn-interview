describe('LoginFormController', function() {

  beforeEach(module('app'));

  var $controller;
  var $rootScope;
  var auth;
  var $q;

  beforeEach(inject(function(_$rootScope_, _$controller_, _auth_, _$q_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    auth = _auth_;
    $q = _$q_;
  }));

  describe("submit function", function() {

    it("calls auth.login with $scope.credentials", function() {

      var fakePromise = $q.when();
      spyOn(auth, 'login').and.returnValue(fakePromise);

      var $scope = $rootScope.$new();
      var controller = $controller('LoginFormController', {
        $scope: $scope
      });
      $scope.credentials = {
        username: "taylor",
        password: "qweqwe"
      };
      controller.submit();
      expect(auth.login).toHaveBeenCalledWith($scope.credentials);

    });

  });

});
