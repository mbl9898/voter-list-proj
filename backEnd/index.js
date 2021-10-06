import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { connection } from '~/config';
import { logger } from '~/utils';
import routes from '~/routes';
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();

const port = 5000;
const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'testing'
) {
  const options = require('~/config/swagger').swagger,
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express');

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(options), { explorer: true }),
  );
}

http.createServer(app);
app.listen(port, () => {
  logger('info', 'Info:', `Listening on port: ${port}`);
});

module.exports = app;
