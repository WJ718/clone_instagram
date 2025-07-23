const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('<h1>아직 완성되지 않았어요</h1>');
});

module.exports = router;