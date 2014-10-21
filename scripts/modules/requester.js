/*globals define*/
define(['jquery', 'q'], function ($, Q) {
    'use strict';
    var requester;
    requester = (function () {
        var getJSON = function getJSON(resourceURL) {
            var deferred = Q.defer();
            
            deferred.resolve(
                $.ajax({
                    url: resourceURL,
                    type: 'GET',
                    contentType: 'application/json',
                    success: function(data) {
                        deferred.resolve(data);
                    },
                    error: function(err) {
                        deferred.reject(err);
                    }
                })
            );

            return deferred.promise;
        };

        var postJSON = function postJSON(resourceURL, data, sessionkey) {
            var deferred = Q.defer();

            if (data) {
                var dataInput = JSON.stringify(data);
                console.log(data);
            }
            if (sessionkey) {
                var headers = {
                    "x-sessionkey": sessionkey
                }
            }

            deferred.resolve(
                $.ajax({
                    url: resourceURL,
                    type: 'POST',
                    data: dataInput,
                    headers: headers,
                    contentType: 'application/json',
                    success: function(data) {
                        deferred.resolve(data);
                    },
                    error: function(err) {
                        deferred.reject(err);
                    }
                })
            );

            return deferred.promise;
        };

        var putJSON = function putJSON(resourceURL, sessionkey) {
            var deferred = Q.defer();
            console.log("In putJson.");
            console.log(resourceURL + " " + sessionkey);

            deferred.resolve(
                $.ajax({
                    url: resourceURL,
                    type: 'PUT',
                    headers: {
                        "x-sessionkey": sessionkey
                    },
                    contentType: 'application/json',
                    success: function (data) {
                        deferred.resolve(data);
                    },
                    error: function (err) {
                        deferred.reject(err);
                    }
                })
            );

            return deferred.promise;
        };

        return {
            getJSON: getJSON,
            postJSON: postJSON,
            putJSON: putJSON
        };
    }());
    return requester;
});