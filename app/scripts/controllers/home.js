function HomeController(HomeService, ApiService) {

  var self = this;
  //Init
  self.homeService = HomeService;
  self.apiService = ApiService;
  self.homeService.username = "Bob";
  self.homeService.getTest();
  self.homeService.postTest();
  //ApiService.authJwt("admin", "changeme");
  //Fn
}

angular.module('app').controller('HomeController', HomeController);
