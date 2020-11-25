import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let conn: MongoClient;

type ExtendedProcess = NodeJS.Process & {
  mongoUri: string;
  mongoDbName: string;
  mongoInstance: MongoMemoryServer;
};

export async function clearDatabase(): Promise<void> {
  conn = await MongoClient.connect((process as ExtendedProcess).mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const collections = await conn
    .db((process as ExtendedProcess).mongoDbName)
    .collections();

  for (let collection of collections) {
    await collection.deleteOne({});
  }
}

export async function connect(): Promise<void> {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 9002,
      dbName: 'mw-db',
    },
    binary: {
      version: '4.4.2',
    },
  });

  (process as ExtendedProcess).mongoInstance = mongod;

  await mongod.start();

  await mongod.ensureInstance();

  const dbName = await mongod.getDbName();
  const mongoUri = await mongod.getUri();

  (process as ExtendedProcess).mongoUri = mongoUri;
  (process as ExtendedProcess).mongoDbName = dbName;

  conn = await MongoClient.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.db(dbName);
}

export function rootMongooseTestModule(
  options: MongooseModuleOptions = {},
): DynamicModule {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      return {
        uri: (process as ExtendedProcess).mongoUri,
        ...options,
      };
    },
  });
}

export async function closeInMongodConnection(): Promise<void> {
  if (conn) {
    await conn.close();
  }

  if ((process as ExtendedProcess).mongoInstance) {
    await (process as ExtendedProcess).mongoInstance.stop();
  }
}
