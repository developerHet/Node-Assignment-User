const express = require('express');
const { createUser, getUsers,getUser, updateUser, deleteUser } = require('../controller/user');

const router = express.Router();

router.post('/',createUser);
router.get('/',getUsers);
router.put('/:id',updateUser);
router.get('/:id',getUser);
router.delete('/:id',deleteUser);


module.exports = router;