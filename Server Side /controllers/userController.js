
const bcrypt = require("bcryptjs");//password encript module
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const ResponseService = require('../common/ResponseService'); // Response service
const User = require('../models/user'); // User model

// signUp
exports.signUp = function (req, res) {
    var validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    User.findOne({ where: { email: req.body.email } }).then((user) => {

        if (req.body.firstname.length < 3) {
            fnameerr = "First Name must be 3 characters long!";
            return res.status(400).json(fnameerr);
        } else if(req.body.lastname.length < 3){
            fnameerr = "Last Name must be 3 characters long!";
            return res.status(400).json(fnameerr);
        } else if (req.body.email.length == 0) {
            emailerr = "Email is empty";
            return res.status(400).json(emailerr);
        } else if (!validEmailRegex.test(req.body.email)) { 
            emailerr = "Email is not valid!";
            return res.status(400).json(emailerr);
        } else if (req.body.password.length < 6) {
            passerr = "Password must be 6 characters long!";
            return res.status(400).json(passerr);
        }
        else if (req.body.password2 !== req.body.password) {
            passerr = "Passwords must match!";
            return res.status(400).json(passerr);
        }
        else if (user) {
            emailerr = "Email already exists";
            return res.status(400).json(emailerr);
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    User.password = hash;
                    User
                        .create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            contact_number: req.body.contact_number,
                            password: hash,
                            role: "user"
                        })
                        .then(() => {
                            User.findOne({ where: { email: req.body.email } })
                                .then((user) => {
                                    if (!user) {
                                        emailerr = "User not found";
                                        return res.status(404).json(emailerr);
                                    }
                                    else {
                                            const payload = {
                                                u_id: user.id,
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email,
                                                password: user.password,
                                                role: user.role,
                                                contact_number: user.contact_number
                                            }; //create jwt payload
                                        //sign token
                                        jwt.sign(
                                            payload,
                                            keys.secretOrKey,
                                            { expiresIn: 3600 },
                                            (err, token) => {
                                                res.json({
                                                    success: true,
                                                    token: "Bearer " + token
                                                });
                                            }
                                        );
                                    }
                                }).catch(err => ResponseService.generalPayloadResponse(err, "error", res));
                        }).catch(err => ResponseService.generalPayloadResponse(err, "error", res));
                });
            });

        }
    });
}

// Log in
exports.logIn = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ where: { email } })
        .then((user) => {
            if (!user) {
                emailerr = "User not found";
                return res.status(404).json(emailerr);
            }else if(user.is_deleted){
                blocked = "You account has been blocked by Admin !";
                return res.status(404).json(blocked);
            } else {
                //check password
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        //res.json({ msg: "Success" });
                        //User matched
                        const payload = {
                            u_id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            password: user.password,
                            role: user.role,
                            contact_number: user.contact_number
                        }; //create jwt payload

                        //sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                });
                            }
                        );
                    } else {
                        passworerr = "Password incorrect";
                        return res.status(400).json(passworerr);
                    }
                });
            }
        })
        .catch(err => ResponseService.generalPayloadResponse(err, null, res));
}

//reset password
exports.resetPassword = (req, res) => {
    const id = req.params.id;
    const prevpassword = req.body.prevpassword;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (confirmpassword !== newpassword) {
        passerr = "Passwords must match!";
        return ResponseService.generalResponse(passerr,res);
    } else {
        User.findOne({ where: { u_id: id } })
            .then(user => {
                if (!user) {
                    return ResponseService.generalResponse(msgs.couldNotFind,res);
                }else{
                    bcrypt.compare(prevpassword, user.password, function(err, isMatch) {
                        if (err) {
                          return ResponseService.generalResponse(err,res);
                        } else if (!isMatch) {
                            return ResponseService.generalResponse("Password doesn't match!",res);
                        } else {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newpassword, salt, (err, hash) => {
                                    if (err) throw err;
                                    User.password = hash;
                                    User.update(
                                        {
                                            password: hash,
                                        },
                                        { where: { u_id: id } }
                                    ).then((user) => {
                                        if (!user) {
                                            err = "User not found";
                                            return ResponseService.generalResponse(err,res);
                                        }
                                        else {
                                            return ResponseService.generalResponse(null, res,  status = 200);
                                        }
                                    }).catch(err => ResponseService.generalPayloadResponse(err, null, res));
                                })
                            });
                        }
                      })
                }
            })
            .catch(err => ResponseService.generalPayloadResponse(err, null, res));
    }
}

