const mongoose = require('mongoose');
const helper = require('../helper/utils');
function UserModel(){};

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require :true
    },
    mobile : {
        type : Number,
        require :true
    },
    email : {
        type : String,
        require : true
    }
})


const User = mongoose.model("User",userSchema);

UserModel.prototype.addUserModel = function(userObject,callback){
        User.findOne({ email : userObject.email},function(err,result){
            if(!err && result != undefined)
            {
                let response = helper.errorResponse(400,"Email already Exists")
                callback(response);
            }
            else
            {
                if(!err && result == null)
                {
                    User.create(userObject,function(err,result)
                    {
                        if(!err && result != undefined)
                        {
                            let response = helper.successResponse(200,"Success",result);
                            callback(null,response);
                        }
                        else
                        {
                            if(err){
                                let response = helper.errorResponse(400,"Failed",err);
                                callback(response);
                            }
                        }
                    });
                }
                else
                {
                    let response = helper.errorResponse(400,"Failed",err);
                    callback(response);
                }
            }
        });     
}

UserModel.prototype.deleteUserModel = function(id,callback){
        User.findOneAndDelete({_id:id},function(err,result)
        {
            if(!err && result != undefined)
            {
                let response = helper.successResponse(200,"Success",result);
                callback(null,response);
            }
            else
            {
                if(err){
                    let response = helper.errorResponse(400,"Failed",err);
                    callback(response);
                }
            }
        });
}

UserModel.prototype.getUserModel = function(callback){
    User.find(function(err,result)
    {
        if(!err && result != undefined)
        {
            let response = helper.successResponse(200,"Success",result);
            callback(null,response);
        }
        else
        {
            if(err){
                let response = helper.errorResponse(400,"Failed",err);
                callback(response);
            }
        }
    });
}

UserModel.prototype.getUserModelById = function(id,callback){
    User.findById(id,function(err,result)
    {
        if(!err && result != undefined)
        {
            let response = helper.successResponse(200,"Success",result);
            callback(null,response);
        }
        else
        {
            if(err){
                let response = helper.errorResponse(400,"Failed",err);
                callback(response);
            }
        }
    });
}


UserModel.prototype.updateUserModel = function(id,userObject,callback){
    User.findByIdAndUpdate(id,userObject,function(err,result)
    {
        if(!err && result != undefined)
        {
            let response = helper.successResponse(200,"Success",result);
            callback(null,response);
        }
        else
        {
            if(err){
                let response = helper.errorResponse(400,"Failed",err);
                callback(response);
            }
        }

    });
}



module.exports = new UserModel();