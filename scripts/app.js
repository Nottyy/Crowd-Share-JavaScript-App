/// <reference path="libs/jquery-2.1.1.js" />
/*globals require, alert, console*/
(function () {
    'use strict';
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1',
            mustache: 'libs/mustache',
            q: 'libs/q',
            sammy: 'libs/sammy',
            requester: 'modules/requester',
            basePersister: 'persisters/basePersister',
            dataPersister: 'persisters/dataPersister',
            userPersister: 'persisters/userPersister',
            chatController: 'controllers/chatController',
            ui: 'ui/ui',
            sha: 'libs/cryptojs-sha1'
        }
    });

    require(['sammy', 'jquery', 'chatController', 'requester', 'q'], function (Sammy, $, ChatController, req, q) {
        var resourceURL = 'http://jsapps.bgcoder.com/';
        var mainContent = $('#main-content');
        var chatApp = new ChatController(mainContent, resourceURL);
        $("#login-register-form").load('templates/login.html');
        chatApp.addEvents();

        var app = Sammy('#main-content', function () {
            this.get('#/', function () {
                chatApp.loadHome();
            });
            this.get('#/get-posts', function () {
                chatApp.loadGetPosts();
            });
            this.get('#/create-post', function () {
                chatApp.loadPost();
            });
            this.get('#/logout', function () {
                chatApp.loadLogout();
            });
        });

        $(function () {
            app.run('#/');
        });
    });
}());