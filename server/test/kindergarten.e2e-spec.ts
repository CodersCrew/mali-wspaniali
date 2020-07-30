import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { KindergartenRepository } from '../src/kindergarten/domain/repositories/kindergarten_repository';

jest.setTimeout(10000);

describe('Kindergarten (e2e)', () => {
  let app: INestApplication;

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(KindergartenRepository).clearTable();

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
          query: '{kindergarten {id}}',
        })
        .expect({
          data: { kindergarten: [] },
        });
    });
  });

  describe('when adding a new kindergarten', () => {
    it('adds kindergarten', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
          mutation {
            createKindergarten(kindergarten:{name:"krasnoludki",city:"Forest",number:"1"}){
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
          {
            kindergartens{
              city
              number
              name
            }
          }
          `,
        })
        .expect(({ body }) => {
          const { kindergartens } = body.data;
          const [newKindergarten] = kindergartens;

          expect(kindergartens.length).toEqual(1);

          expect(newKindergarten).toEqual(
            jasmine.objectContaining({
              name: 'krasnoludki',
              city: 'Forest',
              number: '1',
            }),
          );
        });
    });
  });
});
