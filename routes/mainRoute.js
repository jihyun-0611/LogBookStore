var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main');
const main = new mainController();

/* GET main page. */
router.get('/', main.main);

router.post('/', main.search);


module.exports = router;
