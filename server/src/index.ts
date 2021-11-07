import * as express from 'express';
import { createConnection } from 'typeorm';
import config from './Config/index';
import apiRoutes from './Routes/api';
import * as Cors from "cors";

const app = express();
const requestURL = 'http://localhost:3000';

createConnection(config.database);

app.use(Cors(
  {
    origin: requestURL,
    credentials: true,
    preflightContinue: true
  }
));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

/** Rules */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', requestURL);
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

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
