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

  describe('when adding a new user', () => {
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

  describe('when adding a new child', () => {
    let createdKeyCode: string;
    let authorization: string;
    let childId: string;

    it('adds a new child', async done => {
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

      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
        mutation {
          login(user: {
              mail: "test@test.pl", password: "testtest"
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
          addChild(child: {
              firstname: "John",
              lastname: "Smith",
              birthYear: 2000,
              sex: "male",
          }) {
            status
          }
        }
        `,
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: `{
            me {
              mail
              role
              children {
                _id
                firstname
                lastname
                birthYear
                sex
              }
            }
          }`,
        })
        .then(response => {
          expect(response.body.data.me.mail).toEqual('test@test.pl');
          expect(response.body.data.me.role).toEqual('user');
          expect(response.body.data.me.children.length).toEqual(1);
          expect(response.body.data.me.children[0]).toEqual(
            jasmine.objectContaining({
              firstname: 'John',
              lastname: 'Smith',
              birthYear: 2000,
              sex: 'male',
            }),
          );

          childId = response.body.data.me.children[0]._id;
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: `
        mutation {
          addResult(result: {
            type: "test123"
            childAge: 5
            agilityPoints: 10
            agilitySeconds: 10
            powerCentimeters: 50
            powerPoints: 10
            schoolYearStart: 2019
            speedPoints: 100
            speedSeconds: 10
            strengthCentimeters: 100
            strengthPoints: 10
            testPeriod: "abc"
          }, childId: "${childId}") {
            status
          }
        }
        `,
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', ['Authorization', authorization])
        .send({
          operationName: null,
          variables: {},
          query: `{
            me {
              mail
              role
              children {
                firstname
                results {
                  test
                }
              }
            }
          }`,
        })
        .then(response => {
          expect(response.body.data.me.children[0]).toEqual(
            jasmine.objectContaining({ firstname: 'John' }),
          );

          expect(response.body.data.me.children[0].results[0].test).toEqual(
            jasmine.objectContaining({
              type: 'test123',
              childAge: 5,
              agilityPoints: 10,
              agilitySeconds: 10,
              powerCentimeters: 50,
              powerPoints: 10,
              schoolYearStart: 2019,
              speedPoints: 100,
              speedSeconds: 10,
              strengthCentimeters: 100,
              strengthPoints: 10,
              testPeriod: 'abc',
            }),
          );
        });

      done();
    });
  });
});
