const userModel =  require('../model/userModel');


function UserService(){

};

UserService.prototype.addUserService = function(userObject,callback){
    userModel.addUserModel(userObject,function(err,result){
        if(!err && result != undefined) {
            callback(null,result);
        }
        else {
            callback(err);
        }
    })
}

UserService.prototype.updateUserService = function(id,userObject,callback){
    userModel.updateUserModel(id,userObject,function(err,result){
        if(!err && result != undefined) {
            callback(null,result);
        }
        else {
            callback(err);
        }
    })
}

UserService.prototype.deleteUserService = function(id,callback){
    userModel.deleteUserModel(id,function(err,result){
        if(!err && result != undefined) {
            callback(null,result);
        }
        else {
            callback(err);
        }
    })
}

UserService.prototype.getUserService = function(callback){
    userModel.getUserModel(function(err,result){
        if(!err && result != undefined) {
            callback(null,result);
        }
        else {
            callback(err);
        }
    })
}

UserService.prototype.getUserServiceById = function(id,callback){
    userModel.getUserModelById(id,function(err,result){
        if(!err && result != undefined) {
            callback(null,result);
        }
        else {
            callback(err);
        }
    })
}



module.exports = new UserService();