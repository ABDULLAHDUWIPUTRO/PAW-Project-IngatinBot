const express = require('express');
const validateChatInput = require('../middlewares/validateChatInput');
const { kirimChat } = require('../controllers/chat.controller');

const router = express.Router();

router.post('/', validateChatInput, kirimChat);

module.exports = router;