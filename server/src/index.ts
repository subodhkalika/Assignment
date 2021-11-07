import * as express from 'express';
import { createConnection } from 'typeorm';
import config from './Config/index';
import apiRoutes from './Routes/api';

const app = express();

createConnection(config.database);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

/** Rules */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'options') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
});

app.use('/api', apiRoutes);

/** Error handling for 404 route */
app.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

app.listen(config.server.port, () => {
    console.log(`Server is listening at http://localhost:${config.server.port}`);
});
