var express = require('express');
var router = express.Router();

var Users = require('../models/user');

router.post('/deleteall', function(req, res, next) {
  Users.deleteMany({}, err => {
    if (err) {
      throw err;
    }

    res.json({ message: 'Delete All Users success' });
  });
});

module.exports = router;
