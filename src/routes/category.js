const express = require('express');
const router  = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/',categoryController.list);
router.post('/saveOrUpdate', categoryController.save);
router.get('/edit/:id', categoryController.edit);
router.get('/delete/:id', categoryController.delete);



module.exports = router; 