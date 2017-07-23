function HomeController(HomeService) {

  var self = this;
  //Init
  self.homeService = HomeService;
  self.homeService.username = "Bob";
  //Fn
}

angular.module('app').controller('HomeController', HomeController);
