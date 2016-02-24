myApp.factory('$loginservice', function($http) {
  var API_ROOT = 'http://192.168.10.100:8000/rest/';
  var FORMAT_JSON = '?format=json';


  return {
    coworkers: function(callback){
      $http.get(API_ROOT + 'coworker/'+FORMAT_JSON).success(callback).error(callback);
    },
    coworker_by_username: function(username,callback){
      $http.get(API_ROOT + 'coworker/'+FORMAT_JSON).success(callback);
    },
    contratos: function(callback){
      $http.get(API_ROOT + 'contrato/' + FORMAT_JSON).success(callback);
    },
    contrato_by_username: function(username, callback){
      $http.get(API_ROOT + 'contrato/' + username + FORMAT_JSON).success(callback);
    },
    consumo_registro_by_username:function(username,callback){
      $http.get(API_ROOT+'consumo/'+username+FORMAT_JSON).success(callback).error(callback);
    }
  };

  

});