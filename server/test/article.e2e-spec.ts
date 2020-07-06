import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { ArticlesRepository } from '../src/articles/domain/repositories/article_repository';

describe('Article (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.get(ArticlesRepository).clearTable();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('when DB is empty', () => {
    it('returns empty result', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: '{articles(page:0){id, title}}',
        })
        .expect({
          data: { articles: [] },
        });
    });
  });

  describe('when adding a new article', () => {
    it('adds article', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
          mutation {
            createArticle(article:{
              category: "activity",
              contentHTML: "<div>my_html</div>",
              description: "my description",
              header: "my header",
              pictureUrl: "my picture",
              redactor: {
                firstName: "cool redactor"
              },
              tags: ["life-style"],
              title: "my title",
              subtitle: "my subtitle"
              readingTime: 15    
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
          {
            articles(page:1){
              id,
              title,
              category,
              contentHTML
              description
              header
              pictureUrl
              redactor {
                firstName
              }
              tags
              title
              subtitle
              readingTime
            }
          }
          `,
        })
        .expect(({ body }) => {
          const { articles } = body.data;
          const [newArticle] = articles;

          expect(articles.length).toEqual(1);

          expect(newArticle).toEqual(
            jasmine.objectContaining({
              category: 'activity',
              contentHTML: '<div>my_html</div>',
              description: 'my description',
              header: 'my header',
              pictureUrl: 'my picture',
              redactor: {
                firstName: 'cool redactor',
              },
              tags: ['life-style'],
              title: 'my title',
              subtitle: 'my subtitle',
              readingTime: 15,
            }),
          );
        });
    });
  });

  describe('when add more than one page of articles', () => {
    beforeEach(async () => {
      await app.get(ArticlesRepository).clearTable();

      Array(7)
        .fill(null)
        .forEach(async () => {
          await request(app.getHttpServer())
            .post('/graphql')
            .send({
              operationName: null,
              variables: {},
              query: `
        mutation {
          createArticle(article:{
            category: "activity",
            contentHTML: "<div>my_html</div>",
            description: "my description",
            header: "my header",
            pictureUrl: "my picture",
            redactor: {
              firstName: "cool redactor"
            },
            tags: ["life-style"],
            title: "my title",
            subtitle: "my subtitle"
            readingTime: 15    
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
        .send({
          operationName: null,
          variables: {},
          query: `
        {
          articles(page:1){
            id
          }
        }
        `,
        })
        .expect(({ body }) => {
          const { articles } = body.data;

          expect(articles.length).toEqual(7);
        });
    });

    it('returns article from second page', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
    {
      articles(page:2){
        id
      }
    }
    `,
        })
        .expect(({ body }) => {
          const { articles } = body.data;

          expect(articles.length).toEqual(1);
        });
    });

    describe('when need particular amount of articles', () => {
      it('returns particular articles', async () => {
        await request(app.getHttpServer())
          .post('/graphql')
          .send({
            operationName: null,
            variables: {},
            query: `
    {
      lastArticles(count:4){
        id
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
