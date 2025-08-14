const express = require('express');
const { progress } = require('../data');
const router = express.Router();

router.post('/', (req, res) => {
    const { user_id, module_id, progress: prog } = req.body;
    const entry = { user_id, module_id, progress: prog };
    progress.push(entry);
    res.json({ message: "Progress updated successfully" });
});

module.exports = router;
