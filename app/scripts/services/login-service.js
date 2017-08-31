function LoginService(ApiService) {

  function login() {
    ApiService.authJwt(service.username, service.password);
  }

  var service = {
    login: login,
    username: null,
    password: null
  };

  return service;
}

angular.module('app').service('LoginService', LoginService);
