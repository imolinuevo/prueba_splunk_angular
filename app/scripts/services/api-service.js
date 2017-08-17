function ApiService($http, $window, jwtHelper, Config) {

  function isValidSession(requiredRole) {
    if(service.token) {
      if(!jwtHelper.isTokenExpired(service.token)) {
        var roles = JSON.parse(jwtHelper.decodeToken(service.token).roles);
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

  function get(url, callback) {

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
    });
  }

  function post(url, data, callback) {

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
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: data,
    }).then(function(data, status) {
      if(typeof(callback) != 'undefined') {
        callback(data, status);
      }
    });
  }

  function authJwt(username, password) {
    var body = {
      username: username,
      password: password
    };
    post('auth-jwt/', body, function(response) {
      service.token = response.data.token;
    });
  }

  var token = $window.localStorage.getItem('token') || null;
  var service = {
    token: null,
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
