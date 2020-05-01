const express = require('express');
const router = express.Router();
const { checkAuth } = require('./../services/auth');

router.use(function (req, res, next) {
  let authToken = req.header('Authorization');
  if (authToken) {
    authToken = authToken.slice(7);
    checkAuth(authToken)
        .then(r => {
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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
