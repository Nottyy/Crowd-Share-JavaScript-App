/// <reference path="../libs/mustache.js" />
/// <reference path="../libs/jquery-2.1.1.js" />
/*globals define*/
define(['requester', 'q', 'mustache', 'jquery'], function (requester, Q, Mustache, $) {
    'use strict';
    var DataPersister;
    DataPersister = (function () {
        function DataPersister(resourceURL) {
            this.resourceURL = resourceURL;
        }

        DataPersister.prototype.getAllPosts = function (selector) {
            requester.getJSON(this.resourceURL + "post")
                .then(function (result) {
                    var parsedUL = templateParser(result);

                    selector.html(parsedUL);
                });
        };

        DataPersister.prototype.getAllPostsByUser = function (username, selector) {
            requester.getJSON(this.resourceURL + "post?user=" + username)
                .then(function (result) {
                    var parsedUL = templateParser(result);

                    selector.html(parsedUL);

                }, function (err) {
                    console.log(err);
                });
        }

        function templateParser(result) {
            var template = $('#messages-template').html();
            var ul = $('<ul/>');

            for (var i = 0; i < result.length; i++) {
                var output = Mustache.render(template, result[i]);
                ul.append(output);
            }

            return ul;
        };
        return DataPersister;
    }());

    return DataPersister;
});
