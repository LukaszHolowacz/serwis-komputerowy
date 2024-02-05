const express = require('express');
const router = express.Router();
const authService = require('./authenticationService');
const userService = require('./usersService');
const searchService = require('./userSearchService');

router.post('/login', authService.loginUser);
router.post('/addUser', userService.addUser);
router.put('/update-user', userService.updateUser);
router.put('/ban-user', userService.banUser);
router.put('/unban-user', userService.unbanUser);
router.get('/search', searchService.searchUsers);
router.get('/get-user-data', userService.getUserData);

module.exports = router;
