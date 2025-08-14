const express = require('express');
const { progress } = require('../data/storage');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/progress:
 *   post:
 *     summary: Update Learning Progress
 *     tags: [Progress Tracking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, module_id, progress]
 *             properties:
 *               user_id: { type: string, example: "64b2f5c9d4e7a" }
 *               module_id: { type: string, example: "mdl_001" }
 *               progress: { type: integer, example: 80 }
 *     responses:
 *       200:
 *         description: Progress updated successfully
 */
router.post('/', auth, (req, res) => {
  const { user_id, module_id, progress: pct } = req.body;
  if (typeof pct !== 'number') {
    return res.status(400).json({ error: 'progress must be a number' });
  }

  // upsert
  const idx = progress.findIndex(p => p.user_id === user_id && p.module_id === module_id);
  if (idx >= 0) progress[idx].progress = pct;
  else progress.push({ user_id, module_id, progress: pct });

  res.json({ message: 'Progress updated successfully' });
});

module.exports = router;
