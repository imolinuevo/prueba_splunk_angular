function HomeService(ApiService) {

  function getTest() {
    ApiService.get( ApiService.url + 'test-get/', function(data) {
				console.log(data);
    });
  }

  function postTest() {
    var body = {
      email: "secret"
    };
    ApiService.post( ApiService.url + 'test-post/', body, function(data) {
				console.log(data);
    });
  }

  var service = {
    username: null,
    getTest: getTest,
    postTest: postTest
  };

  return service;

}

angular.module('app').service('HomeService', HomeService);
