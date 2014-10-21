/*globals define*/
define(['userPersister', 'dataPersister'], function(UserPersister, DataPersister){
    'use strict';
    var BasePersister;
    BasePersister = (function(){
        function BasePersister(resourceURL){
            this.resourceURL = resourceURL;
            this.user = new UserPersister(resourceURL);
            this.data = new DataPersister(resourceURL);
        }

        //BasePersister.prototype.isLoggedIn = function(){


        //    var key = this.user._getUserName();
        //    var keyValue = localStorage.getItem(key);
        //    if (keyValue &&) {
        //        if (keyValue !== "") {
        //            return true;
        //        }
        //    }
        //    return false;
        //};

        return {
            get: function(resourceURL){
                return new BasePersister(resourceURL);
            }
        };
    }());
    return BasePersister;
});