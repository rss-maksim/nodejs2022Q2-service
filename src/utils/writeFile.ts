import { promises, existsSync, mkdirSync } from 'fs';

const LOGS_DIRECTORY = 'logs';

export const writeFile = async (filename: string, text: string) => {
  if (!existsSync(LOGS_DIRECTORY)) {
    mkdirSync(LOGS_DIRECTORY);
  }
  await promises.writeFile(filename, text, {
    encoding: 'utf8',
    flag: 'a+',
  });
};
