import { promises, existsSync, mkdirSync, statSync } from 'fs';

import env from '../env';

const LOGS_DIRECTORY = 'logs';

function getFilesizeInBytes(filename) {
  const stats = statSync(filename);
  return stats.size;
}

export const writeFile = async (filename: string, text: string) => {
  if (!existsSync(LOGS_DIRECTORY)) {
    mkdirSync(LOGS_DIRECTORY);
  } else {
    const size = getFilesizeInBytes(filename);
    const maxSize = parseInt(env.MAX_LOG_FILE_SIZE, 10) || 1;
    if (size > maxSize * 1024) {
      await promises.truncate(filename, 0);
    }
  }
  await promises.writeFile(filename, text, {
    encoding: 'utf8',
    flag: 'a+',
  });
};
