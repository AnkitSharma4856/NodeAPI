var express = require('express');
var router = express.Router();
const { userValidation } = require('../middleware/validationMiddleware');
const { userRegistration, userRegistrationList } = require('../controller/registration');

try {
  router.get('/list', userRegistrationList);
  router.post('/registration', userValidation, userRegistration);
} catch (error) {
  console.log(error, "error");
}

module.exports = router;
