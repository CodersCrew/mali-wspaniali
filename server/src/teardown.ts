import * as dbHandler from './db_handler';

export default async () => {
  await dbHandler.closeInMongodConnection();
};
