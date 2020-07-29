const express = require('express');
const oraController = require('../controllers/oraController');

const router = express.Router(); // to jest middleware function

router.route('/toExcel').get(oraController.exportToExcel);

module.exports = router;
