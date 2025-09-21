const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const purchaseController = require('./controller/purchaseController');
const freightController = require('./controller/freightController');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userController);
app.use('/purchases', purchaseController);
app.use('/freight', freightController);

module.exports = app;
