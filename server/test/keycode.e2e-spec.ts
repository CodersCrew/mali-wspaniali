import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { KeyCodeRepository } from '../src/key_codes/domain/repositories/key_code_repository';

jest.setTimeout(10000);

describe('KeyCode (e2e)', () => {
  let app: INestApplication;

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(KeyCodeRepository).clearTable();

    done();
  });

  afterEach(async done => {
    await new Promise(resolve => setTimeout(resolve, 5000));

    await app.close();

    done();
  });

  describe('when DB is empty', () => {
    it('returns empty result', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
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
    it('adds article', async () => {
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
        .expect(200);

      await request(app.getHttpServer())
        .post('/graphql')
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
