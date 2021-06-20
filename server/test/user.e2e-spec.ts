import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { UserRepository } from '../src/users/domain/repositories/user_repository';
import * as bcrypt from 'bcrypt';

jest.setTimeout(10000);

describe('User (e2e)', () => {
  let app: INestApplication;
  let authorizationToken: string;
  let createdKindergartenId: string;

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
            query: `
            mutation {
              createKeyCode(target: "parent") {
                createdAt
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
    let childId: string;

    it('adds a new child', async done => {
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
          query: `
        mutation {
          createKindergarten(kindergarten: {
            name: "my-kindergarten", number: 5, address: "my-address", city: "my-city"
          }) {
            _id
          }
        }
        `,
        })
        .expect(200)
        .then(response => {
          const { _id } = response.body.data.createKindergarten;

          createdKindergartenId = _id;
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
            createdAt
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
          query: `
        mutation {
          addChild(child: {
              firstname: "John",
              lastname: "Smith",
              birthYear: 2000,
              birthQuarter: 1,
              sex: "male",
              kindergartenId: "${createdKindergartenId}",
          }) {
            firstname
          }
        }
        `,
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
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
          expect(response.body.data.me.role).toEqual('parent');
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
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `
        mutation {
          createAssessmentResult(result: {
            childId: "${childId}"
            kindergartenId: "${createdKindergartenId}"
            assessmentId: "some-id"
            firstMeasurementNote: "first-note"
            lastMeasurementNote: "last-note"
            firstMeasurementRunResult: 10
            lastMeasurementRunResult: 10
            firstMeasurementPendelumRunResult: 10
            lastMeasurementPendelumRunResult: 10
            firstMeasurementThrowResult: 10
            lastMeasurementThrowResult: 10
            firstMeasurementJumpResult: 10
            lastMeasurementJumpResult: 10
          }) {
            firstMeasurementNote
          }
        }
        `,
        });

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
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
                  firstMeasurementRunResult
                  lastMeasurementRunResult
                  firstMeasurementPendelumRunResult
                  lastMeasurementPendelumRunResult
                  firstMeasurementThrowResult
                  lastMeasurementThrowResult
                  firstMeasurementJumpResult
                  lastMeasurementJumpResult
                }
              }
            }
          }`,
        })
        .then(response => {
          expect(response.body.data.me.children[0]).toEqual(
            jasmine.objectContaining({ firstname: 'John' }),
          );

          expect(response.body.data.me.children[0].results[0]).toEqual(
            jasmine.objectContaining({
              firstMeasurementJumpResult: 10,
              firstMeasurementPendelumRunResult: 10,
              firstMeasurementRunResult: 10,
              firstMeasurementThrowResult: 10,
              lastMeasurementJumpResult: 10,
              lastMeasurementPendelumRunResult: 10,
              lastMeasurementRunResult: 10,
              lastMeasurementThrowResult: 10,
            }),
          );
        });

      done();
    });
  });
});
