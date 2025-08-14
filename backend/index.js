const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');
const modelRoutes = require('./routes/models');
const progressRoutes = require('./routes/progress');

const app = express();
app.use(cors());
app.use(express.json());

// make uploads folder if it doesn't exist (for report files)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ---------- Swagger setup ----------
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserPublic:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         name: { type: string }
 *         email: { type: string, format: email }
 *         role: { type: string, enum: [patient, student, educator] }
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error: { type: string }
 *     ReportAnalysis:
 *       type: object
 *       properties:
 *         report_id: { type: string }
 *         patient_id: { type: string }
 *         analysis_text: { type: string }
 *         affected_organs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               organ: { type: string }
 *               highlight_areas:
 *                 type: array
 *                 items: { type: string }
 *         3d_model_url: { type: string }
 */
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BIO LENS – API',
      version: '1.0.0',
      description: 'Interactive 3D Visualization Platform – API docs generated from JSDoc comments',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], // read JSDoc comments from route files
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------- Routes ----------
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/progress', progressRoutes);

// health check
app.get('/', (req, res) => res.json({ message: 'Bio Lens API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
