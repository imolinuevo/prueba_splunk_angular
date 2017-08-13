function HomeService(ApiService) {

  function getTest() {
    ApiService.get('test-get/', function(data) {
				console.log(data);
    });
  }

  function postTest() {
    var body = {
      email: "secret"
    };
    ApiService.post('test-post/', body, function(data) {
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
