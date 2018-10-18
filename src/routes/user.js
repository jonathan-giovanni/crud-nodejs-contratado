const express = require('express');
const router  = express.Router();

const userController = require('../controllers/userController');

router.get('/',userController.list);
router.post('/saveOrUpdate', userController.save);
router.get('/edit/:id', userController.edit);
router.get('/delete/:id', userController.delete);

module.exports = router;
