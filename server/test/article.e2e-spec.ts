import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { ArticlesRepository } from '../src/articles/domain/repositories/article_repository';
import { UserRepository } from '../src/users/domain/repositories/user_repository';
import * as bcrypt from 'bcrypt';
import waitForExpect from 'wait-for-expect';

jest.setTimeout(10000);

describe('Article (e2e)', () => {
  let app: INestApplication;
  let authorizationToken: string;

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(ArticlesRepository).clearTable();
    await app.get(UserRepository).clearTable();

    await app
      .get(UserRepository)
      .createAdmin(
        'test@test.pl',
        await bcrypt.hash('testtest', await bcrypt.genSalt(10)),
      );

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
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `{
            paginatedArticles(page:0){
              articles {
                _id,
                title
              }
            }
          }`,
        })
        .expect({
          data: { paginatedArticles: { articles: [] } },
        });
    });
  });

  describe('when adding a new article', () => {
    it('adds article', async () => {
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
            createArticle(article:{
              category: "activity",
              contentHTML: "<div>my_html</div>",
              description: "my description lorem ipsum my description lorem ipsum my description lorem ipsum",
              pictureUrl: "https://www.youtube.com/watch?v=rr0gvSS1OzE",
              redactor: {
                firstName: "cool redactor",
                lastName: "his-lastname",
                avatarUrl: "https://mali-wspaniali.netlify.app/"
              },
              tags: ["life-style"],
              title: "my title lorem ipsum"
            }) {
              status
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
            paginatedArticles(page:1){
              articles {
                _id,
              title,
              category,
              contentHTML
              description
              pictureUrl
              redactor {
                firstName
                lastName
                avatarUrl
              }
              tags
              title
              }
            }
          }
          `,
        })
        .expect(({ body }) => {
          const { articles } = body.data.paginatedArticles;
          const [newArticle] = articles;

          expect(articles.length).toEqual(1);

          expect(newArticle).toEqual(
            jasmine.objectContaining({
              category: 'activity',
              contentHTML: '<div>my_html</div>',
              description:
                'my description lorem ipsum my description lorem ipsum my description lorem ipsum',
              pictureUrl: 'https://www.youtube.com/watch?v=rr0gvSS1OzE',
              redactor: {
                firstName: 'cool redactor',
                lastName: 'his-lastname',
                avatarUrl: 'https://mali-wspaniali.netlify.app/',
              },
              tags: ['life-style'],
              title: 'my title lorem ipsum',
            }),
          );
        });
    });
  });

  describe('when add more than one page of articles', () => {
    beforeEach(async () => {
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

      Array(7)
        .fill(null)
        .forEach(async () => {
          await request(app.getHttpServer())
            .post('/graphql')
            .set('Authorization', authorizationToken)
            .send({
              operationName: null,
              variables: {},
              query: `
        mutation {
          createArticle(article:{
            category: "activity",
            contentHTML: "<div>my_html</div>",
            description: "my description lorem ipsum my description lorem ipsum my description lorem ipsum",
            pictureUrl: "https://www.youtube.com/watch?v=rr0gvSS1OzE",
            redactor: {
              firstName: "cool redactor"
              lastName: "his-lastname",
              avatarUrl: "https://mali-wspaniali.netlify.app/"
            },
            tags: ["life-style"],
            title: "my title lorem ipsum"
          }) {
            status
          }
        }
        `,
            });
        });
    });

    it('returns full page of articles', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', authorizationToken)
        .send({
          operationName: null,
          variables: {},
          query: `
        {
          paginatedArticles(page:1){
            articles {
              _id
            }
          }
        }
        `,
        })
        .expect(({ body }) => {
          const { articles } = body.data.paginatedArticles;

          expect(articles.length).toEqual(6);
        });
    });

    it('returns article from second page', async () => {
      await waitForExpect(async () => {
        const result = await request(app.getHttpServer())
          .post('/graphql')
          .set('Authorization', authorizationToken)
          .send({
            operationName: null,
            variables: {},
            query: `
    {
      paginatedArticles(page:2){
        articles {
          _id
        }
      }
    }
    `,
          });

        const { articles } = result.body.data.paginatedArticles;

        expect(articles.length).toBe(1);
      });
    });

    describe('when need particular amount of articles', () => {
      it('returns particular articles', async () => {
        await request(app.getHttpServer())
          .post('/graphql')
          .set('Authorization', authorizationToken)
          .send({
            operationName: null,
            variables: {},
            query: `
    {
      lastArticles(count:4){
        _id
      }
    }
    `,
          })
          .expect(({ body }) => {
            const { lastArticles } = body.data;

            expect(lastArticles.length).toEqual(4);
          });
      });
    });
  });
});
