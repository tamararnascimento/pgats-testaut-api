import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import userController from './controller/userController.js';
import purchaseController from './controller/purchaseController.js';
import freightController from './controller/freightController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerPath = join(__dirname, 'swagger.json');
const swaggerDocument = JSON.parse(readFileSync(swaggerPath, 'utf-8'));

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userController);
app.use('/purchases', purchaseController);
app.use('/freight', freightController);

export default app;
