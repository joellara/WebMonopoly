'use strict';

var express = require('express');
var path = require('path');
var crypto = require('crypto');

var router = express.Router();
var User = require(path.join(__dirname, '../models/Users.js'));
//get Hash for specific text, with salt, or create new hash
function getHash(str, salt = crypto.randomBytes(256)) {
    let password = str.trim();
    let hash = crypto.pbkdf2Sync(password, salt.toString('hex'), 2000, 512, 'sha512');
    return [hash, salt];
}
/* Rest API Server for authentication for login and logout */
router.get('/', function(req, res, next) {
    res.redirect('/');
});

//set cookies for login, check if user exists
router.post('/login/', function(req, res, next) {
    let [password, ] = getHash(req.body.password.trim());
    User.findOne({ username: req.body.username}, (err, user) => {
        if (err) res.json({
            valid: false,
            message: 'Error interno, intente de nuevo más tarde.'
        });
        if (typeof user !== undefined && user !== null) {
            let [password,] = getHash(req.body.password.trim(),user.salt);
            User.findOne({username:req.body.username,password:password},(err2,user2)=>{
                if (err2) res.json({
                    valid: false,
                    message: 'Error interno, intente de nuevo más tarde.'
                });
                if (typeof user2 !== undefined && user !== null) {
                    req.session.user_id = user._id;
                    req.session.user_name = user.name;
                    req.session.user_username = user.username;
                    res.json({
                        valid: true,
                        loggedIn: true,
                        message: '¡Bienvenid@, ' + user.name + '!',
                        player: {
                            id: user._id,
                            name: user.name
                        },
                        redirect: req.session.redirect
                    });
                }else{
                    res.json({
                        valid: true,
                        loggedIn: false,
                        message: 'Combinación de usuario/contraseña incorrectos.'
                    });
                }
            });
        } else {
            res.json({
                valid: true,
                loggedIn: false,
                message: 'Combinación de usuario/contraseña incorrectos.'
            });
        }
    });
});

//add new user
router.post('/signup/', function(req, res, next) {
    User.count({ username: req.body.username }, (err, count) => {
        if (count === 0) {
            if (err) res.json({
                valid: false,
                message: 'Error interno, intente de nuevo más tarde.'
            });
            let [password, salt] = getHash(req.body.password.trim());
            var newUser = new User({ name: req.body.name, username: req.body.username, password: password, salt: salt });
            if (newUser !== undefined && newUser !== null) {
                newUser.save(function(err, user){
                    if (err) res.json({
                        valid: false,
                        message: 'Error interno. Intente de nuevo más tarde.'
                    });
                    req.session.user_id = user._id;
                    req.session.user_name = user.name;
                    req.session.user_username = user.username;
                    res.json({
                        valid: true,
                        loggedIn: true,
                        created:true,
                        message: '¡Usuario ' + user.username + ' creado con éxito!',
                        player: {
                            id: user._id,
                            name: user.name,
                            username: user.username
                        }
                    });
                });
            }
        } else {
            res.json({
                valid: true,
                created:false,
                message: 'Ya existe ese usuario'
            });
        }

    });
});

//delete logout
router.post('/logout/', function(req, res, next) {
    req.session.user_id = undefined;
    req.session.user_name = undefined;
    req.session.user_username = undefined;
    res.json({
        validity: true,
        loggedOut: true,
        message: 'Sesión terminada, ¡Regresa pronto!'
    });
});

module.exports = router;
