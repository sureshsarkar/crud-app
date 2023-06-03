const express = require('express');
const { getAllUsers, registerUser, deleteUser, updateUser, userLogin, userLogout } = require('../controlers/UserControler');
const { isAuthUser, authRoles } = require('../controlers/middelware/auth');

// router object 
const router = express.Router();
// register user
router.post("/user/registerUser",registerUser);
// Get all user
router.route("/user/all-users").get(isAuthUser, authRoles("admin"), getAllUsers);
// delete user
router.route("/user/deleteUser/:id").delete(isAuthUser, authRoles("admin"), deleteUser);
// update user
router.route("/user/updateUser/:id").put(isAuthUser, authRoles("admin"), updateUser);
// login user
router.post('/user/login', userLogin);
// logout user
router.post('/user/logout', userLogout);

module.exports = router;