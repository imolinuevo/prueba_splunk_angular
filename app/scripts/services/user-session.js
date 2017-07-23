function UserSession($window, jwtHelper) {

  var token = $window.localStorage.getItem('token') || null;
  var session = {
    token: token,
    isValid: isValidSession,
    set: setSession,
    delete: deleteSession
  };

  function isValidSession(requiredRole) {
    if(session.token) {
      if(!jwtHelper.isTokenExpired(session.token)) {
        var roles = JSON.parse(jwtHelper.decodeToken(session.token).roles);
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
    session.token = newToken;
  }

  function deleteSession() {
    $window.localStorage.removeItem('token');
    session.token = null;
  }

  return session;

}

angular.module('app').service('UserSession', UserSession);
