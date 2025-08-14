const express = require('express');
const multer = require('multer');
const path = require('path');
const { auth } = require('../middleware/auth');
const { reports, models, uuid } = require('../data/storage');

const router = express.Router();

// configure multer to save files to /uploads
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (_, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage });

/**
 * @swagger
 * /api/reports/upload:
 *   post:
 *     summary: Upload Medical Report (PDF/Image)
 *     tags: [Medical Report Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file, patient_id]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               patient_id:
 *                 type: string
 *                 example: "64b2f5c9d4e7a"
 *     responses:
 *       200:
 *         description: Report uploaded successfully
 *       400:
 *         description: Valid medical report file is required.
 */
router.post('/upload', auth, upload.single('file'), (req, res) => {
  const { patient_id } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Valid medical report file is required.' });
  if (!patient_id) return res.status(400).json({ error: 'patient_id is required.' });

  const report_id = 'rep_' + uuid().slice(0, 8);
  reports.push({
    report_id,
    patient_id,
    file_name: req.file.filename,
    status: 'processing',
    // a simple placeholder analysis object
    analysis: {
      analysis_text: 'Mild cardiac arrhythmia detected...',
      affected_organs: [{ organ: 'Heart', highlight_areas: ['left_atrium'] }],
      "3d_model_url": models[0]?.model_file_url || 'https://example.com/models/heart.glb'
    }
  });

  return res.json({ message: 'Report uploaded successfully', report_id, status: 'processing' });
});

/**
 * @swagger
 * /api/reports/{report_id}:
 *   get:
 *     summary: Get Report Analysis
 *     tags: [Medical Report Analysis]
 *     parameters:
 *       - in: path
 *         name: report_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportAnalysis'
 *       404:
 *         description: Report not found.
 */
router.get('/:report_id', (req, res) => {
  const rep = reports.find(r => r.report_id === req.params.report_id);
  if (!rep) return res.status(404).json({ error: 'Report not found.' });

  const payload = {
    report_id: rep.report_id,
    patient_id: rep.patient_id,
    analysis_text: rep.analysis.analysis_text,
    affected_organs: rep.analysis.affected_organs,
    "3d_model_url": rep.analysis["3d_model_url"],
  };
  return res.json(payload);
});

module.exports = router;
