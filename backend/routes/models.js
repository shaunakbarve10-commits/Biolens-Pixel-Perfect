const express = require('express');
const { models } = require('../data/storage');
const router = express.Router();

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get List of 3D Models
 *     tags: [Anatomy Learning]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', (_, res) => {
  const list = models.map(m => ({
    model_id: m.model_id,
    name: m.name,
    category: m.category,
    preview_image_url: m.preview_image_url
  }));
  res.json(list);
});

/**
 * @swagger
 * /api/models/{model_id}:
 *   get:
 *     summary: Get Specific 3D Model Details
 *     tags: [Anatomy Learning]
 *     parameters:
 *       - in: path
 *         name: model_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get('/:model_id', (req, res) => {
  const m = models.find(x => x.model_id === req.params.model_id);
  if (!m) return res.status(404).json({ error: 'Model not found.' });
  res.json({
    model_id: m.model_id,
    name: m.name,
    description: m.description,
    layers: m.layers,
    model_file_url: m.model_file_url
  });
});

module.exports = router;
