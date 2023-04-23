const express = require('express')
const router = express.Router()

const {register,login,getAllUsers,deleteUser} = require('../controllers/userController');


router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.post('/deleteUser', deleteUser);

module.exports = router;