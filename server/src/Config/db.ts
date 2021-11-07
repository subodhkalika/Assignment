import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { Jobs } from '../Entities/Jobs';
import { Categories } from '../Entities/Categories';
import { Suburbs } from '../Entities/Suburbs';

dotenv.config();

const DATABASE_OPTIONS: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'hipages',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_ROOT_PASSWORD || 'hipages',
    logging: true,
    entities: [Jobs, Categories, Suburbs],
    // synchronize: true,
};

export default DATABASE_OPTIONS;
