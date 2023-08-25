const express = require('express');
const router = express.Router();

const { storeMessage, findMessageViaRoom } = require('../controllers/messages_controller');

router.post('/store', storeMessage);

router.get('/find/:room', findMessageViaRoom)

module.exports = router;