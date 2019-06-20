const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const searchInput = req.body.search;
});

module.exports = router;