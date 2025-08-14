const express = require('express');
const { models } = require('../data');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(models.map(m => ({
        model_id: m.model_id,
        name: m.name,
        category: m.category,
        preview_image_url: m.preview_image_url
    })));
});

router.get('/:model_id', (req, res) => {
    const model = models.find(m => m.model_id === req.params.model_id);
    if (!model) {
        return res.status(404).json({ error: "Model not found." });
    }
    res.json(model);
});

module.exports = router;
