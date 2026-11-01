const express = require('express');
const { renderHome } = require('../controllers/pageController');

const router = express.Router();

router.get('/', renderHome);

module.exports = router;