const express = require('express');
const router = express.Router();

const {addRoom,getAllRooms,getRoomById} = require('../controllers/roomsController');

router.post('/addRoom', addRoom);
router.post('/getRoomById/:id',getRoomById)
router.get('/getAllRooms',getAllRooms);



module.exports = router;