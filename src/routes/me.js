const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/Mecontroller');

router.get('/stored', meController.stored);
router.get('/trash', meController.trash);

module.exports = router;
