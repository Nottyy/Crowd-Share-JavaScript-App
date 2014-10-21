/// <reference path="../modules/requester.js" />
/// <reference path="../libs/cryptojs-sha1.js" />
/*globals define*/
define(['requester'], function (requester) {
    var UserPersister;
    UserPersister = (function () {

        function UserPersister(resourceURL) {
            this.resourceURL = resourceURL;
        }

        UserPersister.prototype._getSessionKey = function () {
            return localStorage.getItem("sessionKey");
        };

        UserPersister.prototype._setSessionKey = function (value) {
            localStorage.setItem("sessionKey", value);
        };

        UserPersister.prototype._clearSessionKey = function () {
            localStorage.removeItem("sessionKey");
            console.log("LocalStorage sessionkey" + localStorage.getItem("sessionkey"));
        },

        UserPersister.prototype._getUserName = function () {
            return localStorage.getItem("username");
        };

        UserPersister.prototype._setUserName = function (value) {
            this.username = value;
            localStorage.setItem("username", value);
        };

        UserPersister.prototype._clearUserName = function () {
            localStorage.removeItem("username");
            console.log("LocalStorage username" + localStorage.getItem("username"))
        };

        UserPersister.prototype.register = function (username, password) {
            var self = this;

            console.log(this.resourceURL + "user");
            console.log(username);
            console.log(password);

            return requester.postJSON(this.resourceURL + "user", {
                "username": username,
                "authCode": CryptoJS.SHA1(username + password).toString(),
            })
                .then(function (result) {
                    console.log("Success.");
                    console.log(username);
                    self._setUserName(username);


                }, function (error) {
                    console.log("SS");
                });
        };

        UserPersister.prototype.login = function (username, password) {
            var self = this;

            return requester.postJSON(this.resourceURL + "auth", {
                "username": username,
                "authCode": CryptoJS.SHA1(username + password).toString(),
            })
                .then(function (result) {
                    self._setSessionKey(result.sessionKey);
                    self._setUserName(result.username);
                }, function (err) {
                    console.log(err);
                });
        };

        UserPersister.prototype.logout = function () {
            var self = this;
            console.log(this._getSessionKey());

            return requester.putJSON(this.resourceURL + "user", this._getSessionKey()
            )
                .then(function (result) {
                    console.log("Successful logout!")
                    console.log(result);
                    self._clearSessionKey();
                    self._clearUserName();
                }, function (err) {
                    console.log(err);
                });
        };

        UserPersister.prototype.createPost = function (title, body) {
            var self = this;
            console.log("IN POST CREATION");
            console.log(title);
            console.log(body);

            return requester.postJSON(this.resourceURL + "post", {
                "title": title,
                "body": body
            }, self._getSessionKey())
                .then(function (result) {
                    console.log("success");
                    console.log(result);
                }, function (err) {
                    console.log("error");
                    console.log(err);
                })
        };


        UserPersister.prototype.isUserLoggedIn = function () {
            return (this._getSessionKey() !== null);
        };

        UserPersister.prototype.isUserRegistered = function () {
            var s = this._getUserName();
            console.log("Username" + " " + s);
            return (this._getUserName() !== null);
        }

        UserPersister.prototype.getCurrentUserData = function () {
            return {
                username: this._getUsername(),
                sessionKey: this._getSessionKey()
            }
        };

        return UserPersister;
    }());
    return UserPersister;
});
