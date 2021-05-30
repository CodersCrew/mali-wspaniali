import * as dbHandler from './db_handler';
import { closeTestApp } from './test/helpers/app_mock';

export default async () => {
  await dbHandler.closeInMongodConnection();

  await closeTestApp();
};
