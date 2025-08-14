const { v4: uuid } = require('uuid');

// In-memory stores (cleared when server restarts)
const users = [];       // { id, name, email, passwordHash, role }
const reports = [];     // { report_id, patient_id, file_name, status, analysis }
const progress = [];    // { user_id, module_id, progress }
const models = [
  {
    model_id: 'mdl_001',
    name: 'Human Heart',
    category: 'Circulatory System',
    description: 'Detailed interactive 3D model of the human heart.',
    layers: ['Outer', 'Muscle', 'Vessels'],
    preview_image_url: 'https://example.com/preview/heart.jpg',
    model_file_url: 'https://example.com/models/heart.glb',
  },
  {
    model_id: 'mdl_002',
    name: 'Human Lungs',
    category: 'Respiratory System',
    description: 'Detailed interactive 3D model of the lungs.',
    layers: ['Outer', 'Bronchi', 'Alveoli'],
    preview_image_url: 'https://example.com/preview/lungs.jpg',
    model_file_url: 'https://example.com/models/lungs.glb',
  },
];

module.exports = { users, reports, progress, models, uuid };
