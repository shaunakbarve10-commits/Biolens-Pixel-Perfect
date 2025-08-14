const express = require('express');
const multer = require('multer');
const { reports } = require('../data');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
    const { patient_id } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "Valid medical report file is required." });
    }
    const newReport = {
        report_id: "rep_" + Date.now(),
        patient_id,
        file: req.file.filename,
        status: "processing",
        analysis_text: "Sample analysis...",
        affected_organs: [{ organ: "Heart", highlight_areas: ["left_atrium"] }],
        "3d_model_url": "https://storage.example.com/models/heart_model.glb"
    };
    reports.push(newReport);
    res.json({ message: "Report uploaded successfully", report_id: newReport.report_id, status: "processing" });
});

router.get('/:report_id', (req, res) => {
    const report = reports.find(r => r.report_id === req.params.report_id);
    if (!report) {
        return res.status(404).json({ error: "Report not found." });
    }
    res.json(report);
});

module.exports = router;
