(function () {
    'use strict';

    angular.module('k121')
    .service('API', api);

    function api($http) {

        var api = "/api";

        return{

            all: params => {
                return $http.get(api + params.url);
            }

            ,save: params => {
                return $http.post(api + params.url, params.data);
            }

            ,delete: params => {

                var opts = {
                    method: 'DELETE',
                    url: api + params.url,
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                }

                if( params.id ) opts.data = {_id: params.id}

                return $http( opts )
            }

        }
    }

})();
