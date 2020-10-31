import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;
let con;
let db;

export const clearDatabase = async () => {
  const collections = await db.collections();

  for (let collection of collections) {
    await collection.deleteOne({});
  }
};

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create({
        instance: {
          port: 9002,
          dbName: 'mw-db',
        },
      });

      await mongod.start(true);

      await mongod.ensureInstance();

      const mongoUri = await mongod.getUri();

      con = await MongoClient.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db = con.db(await mongod.getDbName());

      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (con) {
    con.close();
  }
  if (mongod) {
    await mongod.stop();
  }
};
