const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');
const modelRoutes = require('./routes/models');
const progressRoutes = require('./routes/progress');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/progress', progressRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
