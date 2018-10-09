const express = require('express');
const router  = express.Router();

const subCategoryController = require('../controllers/subCategoryController');

router.get('/',subCategoryController.list);
router.post('/saveOrUpdate', subCategoryController.save);
router.get('/edit/:id', subCategoryController.edit);
router.get('/delete/:id', subCategoryController.delete);

module.exports = router;
