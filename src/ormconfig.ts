import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: join(__dirname, '..', '.env') });

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.POSTGRES_HOST,
  port: +process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
});

// dataSource
//   .initialize()
//   .then(() => {
//     console.log('initialized');
//   })
//   .catch((error) => console.log(error));

export default dataSource;
