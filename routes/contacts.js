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
  res.status(401)
      .json({
          message: 'not authenticated.'
      });
};

const defaultErrorMessage = ({message = 'Something went wrong', res, err = null, status = 400}) => {
    res.status(status)
        .json({
        message: message,
        error: err
    });
};

/* GET contacts listing. */
router.get('/', function(req, res) {
    Contacts.getAll()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            defaultErrorMessage({
                message: null,
                res,
                err
            });
        });
});

router.get('/:id', function (req, res) {
    Contacts.getOne(req.params.id)
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            defaultErrorMessage({
                message: 'User not found',
                err,
                res,
                status: 404
            });
        });
});

router.put('/:id', function (req, res) {
    const updateData = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    Contacts.updateOne(req.params.id, updateData)
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            defaultErrorMessage({
                message: "User not found",
                res,
                err,
                status: 404
            });
        });
});

router.delete('/:id', function (req, res) {
    Contacts.deleteOne(req.params.id)
        .then(() => {
            res.status(410).json();
        })
        .catch(err => {
            defaultErrorMessage({
                message: "User not found",
                res,
                err,
                status: 404
            });
        });
});

module.exports = router;
