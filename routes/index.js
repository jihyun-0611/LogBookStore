var express = require('express');
var router = express.Router();

const mainRoute = require('./mainRoute')
const userRoute = require('./userRoute')
const edituserRoute = require('./edituserRoute')
const bookRoute = require('./bookRoute')
const cartRoute = require('./cartRoute')
const orderRoute = require('./orderRoute')

router.use('/', mainRoute)
router.use('/user', userRoute)
router.use('/edituser', edituserRoute)
router.use('/book', bookRoute)
router.use('/cart', cartRoute)
router.use('/order', orderRoute)

module.exports = router;