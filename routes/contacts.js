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

/* GET contacts listing. */
router.get('/', async function(req, res) {
    Contacts.getAll()
        .then(contacts => {
            console.log(contacts);
            res.json(contacts).status(200);
        })
        .catch(err => {
            res.json({
                message: 'Something went wrong'
            }).status(401);
        });
});

module.exports = router;
