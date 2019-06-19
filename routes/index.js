const express = require('express');
const router = express.Router();


router.use('/components', express.static('assets'));

// Welcome Page
router.get('/', (req, res) => res.render('index'));


module.exports = router;