var app = angular.module("app", [
  "ui.router",
  "angular-jwt",
  "ngMaterial"
]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise("/home");
    $stateProvider
    .state("login", {
      url: "/login",
      controller: "LoginController",
      controllerAs: "self",
      templateUrl: "app/views/controllers/login.html",
      data: {
        authorization: false
      }
    })
    .state("home", {
      url: "/home",
      controller: "HomeController",
      controllerAs: "self",
      templateUrl: "app/views/controllers/home.html",
      data: {
        authorization: true,
        role: "admin"
      }
    });
  }
);
app.run(function($rootScope, $state, ApiService) {
  $rootScope.$on("$stateChangeStart", function(event, toState) {
    if(toState.data.authorization && !ApiService.isValidSession(toState.data.role)) {
      event.preventDefault();
      $state.go("login");
    }
  });
});
