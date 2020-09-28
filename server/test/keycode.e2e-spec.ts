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
  let authorizationToken: string;

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
      token
    }
  }
  `,
        })
        .then(response => {
          authorizationToken = response.body.data.login.token;
        });

      return await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: '{keyCodeSeries {series}}',
        })
        .expect({
          data: { keyCodeSeries: [] },
        });
    });
  });

  describe('when adding a new keyCode', () => {
    it('adds keyCode', async () => {
      let adminId;

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
        token
      }
    }
    `,
        })
        .then(response => {
          authorizationToken = response.body.data.login.token;
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `{
            me {
              _id
            }
          }`,
        })
        .then(response => {
          adminId = response.body.data.me._id;
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `
          mutation {
            createKeyCode(target: "parent") {
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
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `
          {
            keyCodeSeries {
              createdBy
              count
            }
          }
          `,
        })
        .expect(({ body }) => {
          const { keyCodeSeries } = body.data;
          const [newKeyCode] = keyCodeSeries;

          expect(keyCodeSeries.length).toEqual(1);
          expect(keyCodeSeries[0].count).toEqual(1);

          expect(newKeyCode).toEqual(
            jasmine.objectContaining({
              createdBy: adminId,
              count: 1,
            }),
          );
        });
    });
  });
});
