import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { UserRepository } from '../src/users/domain/repositories/user_repository';

jest.setTimeout(10000);

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(UserRepository).clearTable();

    done();
  });

  afterEach(async done => {
    await new Promise(resolve => setTimeout(resolve, 5000));

    await app.close();

    done();
  });

  describe.only('when adding a new user', () => {
    describe('and keyCode is not valid', () => {
      it('does not add user', async () => {
        await request(app.getHttpServer())
          .post('/graphql')
          .send({
            operationName: null,
            variables: {},
            query: `
              mutation {
                createUser(user: {
                    mail: "test@test.pl", password: "testtest", keyCode: "key"
                }) {
                  status
                }
              }
              `,
          })
          .then(response => {
            const [error] = response.body.errors;

            expect(error.message).toEqual(
              'Wrong KeyCode or email already exists.',
            );
          });
      });
    });

    describe('and keyCode is valid', () => {
      let createdKeyCode: string;

      it('adds user', async done => {
        await request(app.getHttpServer())
          .post('/graphql')
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
          .then(response => {
            const { keyCode } = response.body.data.createKeyCode;

            createdKeyCode = keyCode;
          });

        await request(app.getHttpServer())
          .post('/graphql')
          .send({
            operationName: null,
            variables: {},
            query: `
            mutation {
              createUser(user: {
                  mail: "test@test.pl", password: "testtest", keyCode: "${createdKeyCode}"
              }) {
                status
              }
            }
            `,
          })
          .expect(200);

        done();
      });
    });
  });
});
