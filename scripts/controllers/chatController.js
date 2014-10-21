/// <reference path="../libs/jquery-2.1.1.js" />
/*globals define, console*/
define(['basePersister', 'ui', 'jquery'], function (basePersister, UI, $) {
    'use strict';
    var ChatController;
    ChatController = (function () {
        function ChatController(selector, resourceURL) {
            this.selector = selector;
            this.resourceURL = resourceURL;
            this.persister = basePersister.get(resourceURL);
            this.ui = new UI(selector);
        }

        ChatController.prototype.loadHome = function () {
            this.ui.renderHome();
        };

        ChatController.prototype.loadLogin = function () {
            if (this.persister.user.isUserLoggedIn()) {
                this.ui.renderLoginDone();
            } else {
                this.ui.renderLogin();
            }
        };

        ChatController.prototype.loadLogout = function () {
            if (this.persister.user.isUserLoggedIn()) {
                this.persister.user.logout();

                this.ui.renderLogout();
                
            } else {
                this.ui.renderLogoutDone();
            }
        };

        ChatController.prototype.loadRegister = function () {
            if (this.persister.user.isUserRegistered()) {
                this.ui.renderRegisterDone();
            }
            else {
                this.ui.renderRegister();
            }
        };

        ChatController.prototype.loadPost = function () {
            if (this.persister.user.isUserLoggedIn()) {
                console.log("LOGGED IN");
                this.ui.renderCreatePostMenu();
            }
            else {
                console.log("NOT LOGGED IN!")
                this.ui.renderLogoutDone();
            }
        };

        ChatController.prototype.loadGetPosts = function () {
            this.ui.renderGetPostsMenu();
        }

        ChatController.prototype.addEvents = function () {
            var self = this;
            var loginContainer = $("#login-container");

            $(loginContainer).on('click', '#register-button', function () {
                var username = $('#register-username-input').val();
                var password = $('#register-password-input').val();
                var usernameToStr = username.toString();
                var passwordToStr = password.toString();

                self.persister.user.register(usernameToStr, passwordToStr);
                //window.location = '#/chat';
            });

            $(loginContainer).on('click', '#login-btn', function () {
                var username = $('#login-username-input').val();
                var userNameToString = username.toString();
                var password = $('#login-password-input').val();
                var passToString = password.toString();

                self.persister.user.login(userNameToString, passToString);
            });

            $(this.selector).on('click', '#btn-submit', function () {
                var title = $('#input-title').val();
                var titleToStr = title.toString();
                var body = $('#input-body').val();
                var bodyToStr = body.toString();

                self.persister.user.createPost(title, body);
            });

            $(this.selector).on('click', '#get-all-posts', function () {
                var selectorForAllPosts = $('#posts-container');
                self.persister.data.getAllPosts(selectorForAllPosts);
            });

            $(this.selector).on('click', '#search-by-name', function () {
                var selectorForAllPosts = $('#posts-container');
                var username = $('#input-name').val();
                var usernameToStr = username.toString();
                self.persister.data.getAllPostsByUser(usernameToStr, selectorForAllPosts);
            });

            $(loginContainer).on('click', '#no-account-btn', function () {
                $('#login-register-form').load('templates/register.html');
            });

            $(loginContainer).on('click', '#login-container-btn', function () {
                $('#login-register-form').load('templates/login.html');
            });
        };

        //ChatController.prototype.getMessages = function () {
        //    var self = this;
        //    self.persister.data.messages()
        //        .then(function (messages) {
        //            var lastTwentyMessages = messages.slice(messages.length - 20);
        //            self.ui.renderMessages(lastTwentyMessages, '#chat');
        //        }, function (err) {
        //            console.log(err);
        //        });
        //};
        return ChatController;
    }());
    return ChatController;
});