import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { KeyCodeRepository } from '../src/key_codes/domain/repositories/key_codes_repository';
import { UserRepository } from '../src/users/domain/repositories/user_repository';
import * as bcrypt from 'bcrypt';

jest.setTimeout(10000);

describe('KeyCode (e2e)', () => {
  let app: INestApplication;
  let authorization: string;

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(KeyCodeRepository).clearTable();
    await app.get(UserRepository).clearTable();

    done();
  });

  afterEach(async done => {
    await new Promise(resolve => setTimeout(resolve, 5000));

    await app.close();

    done();
  });

  describe('when DB is empty', () => {
    it('returns empty result', async () => {
      await app
        .get(UserRepository)
        .createAdmin(
          'admin@admin.com',
          await bcrypt.hash('adminadmin', await bcrypt.genSalt(10)),
        );

      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
  mutation {
    login(user: {
        mail: "admin@admin.com", password: "adminadmin"
    }) {
      status
    }
  }
  `,
        })
        .then(response => {
          authorization = response.header['set-cookie'];
        });

      return await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: '{keyCodes {id}}',
        })
        .expect({
          data: { keyCodes: [] },
        });
    });
  });

  describe('when adding a new keyCode', () => {
    it('adds keyCode', async () => {
      await app
        .get(UserRepository)
        .createAdmin(
          'admin@admin.com',
          await bcrypt.hash('adminadmin', await bcrypt.genSalt(10)),
        );

      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
    mutation {
      login(user: {
          mail: "admin@admin.com", password: "adminadmin"
      }) {
        status
      }
    }
    `,
        })
        .then(response => {
          authorization = response.header['set-cookie'];
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: `
          mutation {
            createKeyCode {
              date
              keyCode
              createdBy
            }
          }
          `,
        })
        .expect(200);

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: `
          {
            keyCodes {
              createdBy
            }
          }
          `,
        })
        .expect(({ body }) => {
          const { keyCodes } = body.data;
          const [newKeyCode] = keyCodes;

          expect(keyCodes.length).toEqual(1);

          expect(newKeyCode).toEqual(
            jasmine.objectContaining({
              createdBy: 'Janek25',
            }),
          );
        });
    });
  });
});
