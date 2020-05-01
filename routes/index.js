const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const { registerUser, loginUser } = require('./../services/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth/login', async function (request, response) {
    await loginUser(request.body)
        .then(function (userToken) {
            console.log('iamhere');
            response.json(userToken).status(200);
        })
        .catch((err) => {
            response.json(err).status(401);
        });
});

router.post('/auth/register', async function (request, response) {
  await registerUser(request.body)
      .then(function (userToken) {
        response.json(userToken).status(201);
      })
      .catch((err) => {
        response.json(err).status(401);
      });
});

module.exports = router;
