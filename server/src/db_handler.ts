import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
let conn: MongoClient;
let db: Db;

export const clearDatabase = async () => {
  const collections = await db.collections();

  for (let collection of collections) {
    await collection.deleteOne({});
  }
};

export async function connect() {
  mongod = await MongoMemoryServer.create({
    instance: {
      port: 9002,
      dbName: 'mw-db',
    },
  });

  await mongod.start();

  await mongod.ensureInstance();
}

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const mongoUri = await mongod.getUri();

      conn = await MongoClient.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db = conn.db(await mongod.getDbName());

      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (conn) {
    await conn.close();
  }

  if (mongod) {
    await mongod.stop();
  }
};
