var app = angular.module("app", ["ui.router", "angular-jwt"]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise("/home");
    $stateProvider
    .state("home", {
      url: "/home",
      controller: "HomeController",
      controllerAs: "self",
      templateUrl: "app/views/controllers/home.html",
      data: {
        authorization: false
      }
    });
  }
);
app.run(function($rootScope, $state, UserSession) {
  $rootScope.$on("$stateChangeStart", function(event, toState) {
    if(toState.data.authorization && !UserSession.isValid(toState.data.role)) {
      event.preventDefault();
      $state.go("login");
    }
  });
});
