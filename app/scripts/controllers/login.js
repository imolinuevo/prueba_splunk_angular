function LoginController($state, ApiService, LoginService) {

  if(ApiService.token !== null) {
    event.preventDefault();
    $state.go("home");
  }

  var self = this;
  self.loginService = LoginService;
}

angular.module('app').controller('LoginController', LoginController);
