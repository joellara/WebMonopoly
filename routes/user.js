var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user', {
        title: 'Usuario',
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});
module.exports = router;
