var userService = require('../service/userService');

function UserController() {

}

UserController.prototype.addUser = function (req, res) {
    req.checkBody('name', 'username is required.').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('mobile','Mobile must have 10 digit').isLength({min: 10,max : 10});
    req.checkBody('mobile','Mobile must be number and should not be empty').isInt().notEmpty();
    req.checkBody('email', 'Email is must be a valid email').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send({ "Error": errors });
        return;
    }
    else {
        let name = req.body.name;
        let mobile = req.body.mobile;
        let email = req.body.email;
        let userObject = new Object();
        userObject.name = name;
        userObject.mobile = mobile;
        userObject.email = email;
        userService.addUserService(userObject, (err, result) => {
            if (!err && result != undefined) {
                res.status(200).send(result);
            }
            else {
                if (err) {
                    res.status(400).send(err);
                }
            }
        });
    }

}

UserController.prototype.deleteUser = function (req, res) {
    //req.checkBody('id', 'id must be present').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send({ "Error": errors });
        return;
    }
    else {
        userService.deleteUserService(req.params.id, (err, result) => {
            if (!err && result != undefined) {
                res.status(200).send(result);
            }
            else {
                if (err) {
                    res.status(400).send(err);
                }
            }
        });
    }

}

UserController.prototype.getUser = function (req, res) {
    
        userService.getUserService((err, result) => {
            if (!err && result != undefined) {
                res.status(200).send(result);
            }
            else {
                if (err) {
                    res.status(400).send(err);
                }
            }
        });
}

UserController.prototype.getUserById = function (req, res) {
    let id = req.params.id;
    
    userService.getUserServiceById(id,(err, result) => {
        if (!err && result != undefined) {
            res.status(200).send(result);
        }
        else {
            if (err) {
                res.status(400).send(err);
            }
        }
    });
}

UserController.prototype.updateUser = function (req, res) {
    req.checkBody('name', 'username is required.').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('mobile','Mobile must have 10 digits only').isLength({min: 10,max : 10});
    req.checkBody('mobile','Mobile must be number and should not be empty').isInt().notEmpty();
    req.checkBody('email', 'Email is must be a valid email').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send({ "Error": errors });
        return;
    }
    else {
        let name = req.body.name;
        let mobile = req.body.mobile;
        let email = req.body.email;
        let id = req.params.id;
        let userObject = new Object();
        userObject.name = name;
        userObject.mobile = mobile;
        userObject.email = email;
        userService.updateUserService(id,userObject, (err, result) => {
            if (!err && result != undefined) {
                res.status(200).send(result);
            }
            else {
                if (err) {
                    res.status(400).send(err);
                }
            }
        });
    }

}


module.exports = new UserController();