const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController')


//[USERS] /api/user/admin/:id
router.delete('/admin/:_id', userController.deleteUserByIdForAdmin);
//[USERS] /api/user/admin
router.patch('/admin/:email', userController.updatePass);
//[USERS] /api/user/admin/
router.post('/admin', userController.createNewUserForAdmin);
//[USERS] /api/user/admin
router.get('/admin/:email', userController.getUserByEmailForAdmin);
//[USERS] /api/user/admin
router.get('/admin', userController.getAllUserForAdmin);
//[USERS] /api/user/get/:id
router.get('/get/:_id', userController.getUserById);
//[USERS] /api/user/create
router.post('/create', userController.createNewUser);
//[USERS] /api/user/login/admin
router.post('/login/admin', userController.loggingUserForAdmin);
//[USERS] /api/user/login
router.post('/login', userController.loggingUser);
//[USERS] /api/user/:email
router.get('/:email', userController.getUserByEmail);

module.exports = router;
