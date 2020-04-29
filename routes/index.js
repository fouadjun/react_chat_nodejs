const express = require('express');
const router = express.Router();
const User = require('./../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth/login', function (request, response) {

});

router.post('/auth/register', async function (request, response) {
  try {
    const user = new User({
      name: request.body.name,
      username: request.body.username,
      password: request.body.password
    });

    await user.save(function (err, user) {
      if (err) {
        response.status(402);
        response.json({
          'status': 'ERROR',
          'message': err
        });
      }

      response.status(201);
      response.json(user);
    });


  } catch (e) {
    response.status(409);
    response.send(e);
  }

});

module.exports = router;
