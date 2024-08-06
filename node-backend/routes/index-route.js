const express = require('express');
var router = express.Router();

const generatePdfController = require('./../controllers/generatePdfController');
const latestEmailController = require('../controllers/latestEmailController');

router.use('/generate-pdf', generatePdfController.generatePdf);
router.use('/latest-email', latestEmailController.latestEmail);

module.exports = router;