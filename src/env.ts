import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '.env') });

export const getEnvironment = () => process.env;

export default process.env;
