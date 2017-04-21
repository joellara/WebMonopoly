var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Web Monopoly',
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', {
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});

router.get('/login/', function(req, res, next) {
    res.render('login', {
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});

router.get('/sign-up/', function(req, res, next) {
    res.render('signup', {
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});


module.exports = router;
