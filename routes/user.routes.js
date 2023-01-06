const express = require('express');
const router = express.Router();

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/logged', (req, res) => {
  res.render('logged', { username: req.user.displayName, img: req.user.photos[0].value });
});

router.get('/profile', (req, res) => {
  res.render('logged', {username: req.user.displayName});
});

router.get('/profile/settings', (req, res) => {
  res.render('logged', {username: req.user.displayName});
});


module.exports = router;