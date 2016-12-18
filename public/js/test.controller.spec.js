describe('TestController', function() {

  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('controller.hello', function() {
    it("is hello", function() {

      var controller = $controller('TestController');
      expect(controller.hello).toEqual("hello");
    });
  });

});
