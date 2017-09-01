function ApiService($http, $window, $state, $mdToast, jwtHelper, Config) {

  function isValidSession(requiredRole) {
    if(service.token) {
      if(new Date() < new Date(jwtHelper.decodeToken(service.token).expirity)) {
        var roles = jwtHelper.decodeToken(service.token).roles;
        if(roles.includes(requiredRole)) {
          return true;
        } else {
          return false;
        }
      } else {
        deleteSession();
        return false;
      }
    } else {
      return false;
    }
  }

  function setSession(newToken) {
    $window.localStorage.setItem('token', newToken);
    service.token = newToken;
  }

  function deleteSession() {
    $window.localStorage.removeItem('token');
    service.token = null;
  }

  function get(url, callback, errorCallback) {
    var headers = {}
    if(service.token !== null) {
      headers.Authorization = 'Bearer ' + service.token;
    }
    $http({
      method: 'GET',
      url: Config.API_URL + url,
      headers: headers,
    }).then(function(data, status) {
      if(typeof(callback) != 'undefined') {
        callback(data, status);
      }
    }, function(data, status) {
      if(typeof(errorCallback) != 'undefined') {
        errorCallback(data, status);
      }
    });
  }

  function post(url, data, callback, errorCallback) {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if(service.token !== null) {
      headers.Authorization = 'Bearer ' + service.token;
    }
    $http({
      method: 'POST',
      url: Config.API_URL + url,
      headers: headers,
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      },
      data: data,
    }).then(function(data, status) {
      if(typeof(callback) != 'undefined') {
        callback(data, status);
      }
    }, function(data, status) {
      if(typeof(errorCallback) != 'undefined') {
        errorCallback(data, status);
      }
    });
  }

  function authJwt(username, password) {
    var body = {
      username: username,
      password: password
    };
    post('auth-jwt/', body, function(response) {
      setSession(response.data.token);
      $state.go("home");
    }, function() {
      $mdToast.show({
        template: '<md-toast>Invalid username or password</md-toast>',
        hideDelay: 2000,
        position: 'top right'
      });
    });
  }
  var token = $window.localStorage.getItem('token') || null;
  var service = {
    token: token,
    authJwt: authJwt,
    isValidSession: isValidSession,
    setSession: setSession,
    deleteSession: deleteSession,
    get: get,
    post: post
  };

  return service;

}

angular.module('app').service('ApiService', ApiService);
