import * as dbHandler from './db_handler';
import { setupTestApp } from './test/helpers/app_mock';

export default async () => {
  await dbHandler.connect();

  await setupTestApp();
};
