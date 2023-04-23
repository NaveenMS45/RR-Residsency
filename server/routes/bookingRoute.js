const express = require('express');
const router = express.Router();

const {bookRoom,getAllBookings, getUserBookings} = require('../controllers/bookingController')

router.post('/bookRoom', bookRoom);
router.get('/getAllBookings', getAllBookings);
router.post('/getUserBookings', getUserBookings);

module.exports = router;