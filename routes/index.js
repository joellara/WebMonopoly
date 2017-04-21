var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Web Monopoly',
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', {
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});

router.get('/instructions', function(req, res, next) {
    res.render('instructions', {
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});
router.get('/login/', function(req, res, next) {
    res.render('login', {
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});

router.get('/sign-up/', function(req, res, next) {
    res.render('signup', {
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});


module.exports = router;
