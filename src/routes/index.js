const express = require('express');
const router  = express.Router();

//const indexController = require('../controllers/categoryController');

router.get('/',(req,res) => {
  res.render('index');
});

module.exports = router;
