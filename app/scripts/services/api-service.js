function ApiService($http, $window, jwtHelper) {

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
      url: url,
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
      url: url,
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

  var token = $window.localStorage.getItem('token') || null;
  var service = {
    url: 'http://localhost:8000/dj/en-us/prueba/',
    token: null,
    isValidSession: isValidSession,
    setSession: setSession,
    deleteSession: deleteSession,
    get: get,
    post: post
  };

  return service;

}

angular.module('app').service('ApiService', ApiService);
