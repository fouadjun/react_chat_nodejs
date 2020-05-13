const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./../services/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth/login', async function (request, response) {
    await loginUser(request.body)
        .then(function (userToken) {
            response.status(200).json(userToken);
        })
        .catch((err) => {
            response.status(401).json(err);
        });
});

router.post('/auth/register', async function (request, response) {
  await registerUser(request.body)
      .then(function (userToken) {
        response.status(201).json(userToken);
      })
      .catch((err) => {
        response.status(401).json(err);
      });
});

module.exports = router;
