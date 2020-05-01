const express = require('express');
const router = express.Router();
const { checkAuth } = require('./../services/auth');
const { Contacts } = require('../services/util');

router.use(function (req, res, next) {
  let authToken = req.header('Authorization');
  if (authToken) {
    authToken = authToken.slice(7);
    checkAuth(authToken)
        .then(() => {
          next();
        })
        .catch(err => {
          notAuthenticatedMessage(res);
        });
  } else notAuthenticatedMessage(res);
});

const notAuthenticatedMessage = (res) => {
  res.json({
    message: 'not authenticated.'
  }).status(403);
};

const defaultErrorMessage = (res, err = null) => {
    res.json({
        message: 'Something went wrong',
        error: err
    }).status(401);
};

/* GET contacts listing. */
router.get('/', function(req, res) {
    Contacts.getAll()
        .then(contacts => {
            console.log(contacts);
            res.json(contacts).status(200);
        })
        .catch(err => {
            defaultErrorMessage(res, err);
        });
});

router.get('/:id', function (req, res) {
    Contacts.getOne(req.params.id)
        .then(contact => {
            res.json(contact).status(200);
        })
        .catch(err => {
            defaultErrorMessage(res, err);
        });
});

module.exports = router;
