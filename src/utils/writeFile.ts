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
    const maxSize = parseInt(env.MAX_LOG_FILE_SIZE, 10) || 1024;
    if (size > maxSize) {
      await promises.truncate(filename, 0);
    }
  }
  await promises.writeFile(filename, text, {
    encoding: 'utf8',
    flag: 'a+',
  });
};

//+20 Add environment variable to specify logging level and corresponding functionality. Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels.
