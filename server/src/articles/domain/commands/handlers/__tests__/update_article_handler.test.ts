import { Test, TestingModule } from '@nestjs/testing';
import * as dbHandler from '@app/db_handler';
import { CreateArticleHandler } from '@articles/domain/commands/handlers/create_article_handler';
import { CreateArticleCommand } from '@articles/domain/commands/impl';
import { ArticlesModule } from '@articles/articles_module';
import { CreateArticleInput } from '@articles/inputs/article_input';
import { Article } from '@app/articles/domain/models/article_model';
import { getAllArticles } from '@app/test/helpers/app_mock';
import waitForExpect from 'wait-for-expect';

jest.setTimeout(10000);

describe('UpdateArticleHandler', () => {
  let app: TestingModule;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await setup();
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      it('returns article instance', async () => {
        const article = await createArticleWith();

        expect(article).toBeInstanceOf(Article);
        expect(article.id).toBeDefined();
        expect(article.title).toBe('my-title-title');
        expect(article.createdAt).toBeInstanceOf(Date);
        expect(article.contentHTML).toBe('<div>content</div>');
      });

      it('persists article', async () => {
        await createArticleWith();

        await waitForExpect(async () => {
          const articles = await getAllArticles();

          expect(articles.length).toBe(1);
          expect(articles[0].title).toBe('my-title-title');
        });
      });
    });
  });

  function createArticleWith(options: Partial<CreateArticleInput> = {}) {
    const validArticleOptions: CreateArticleInput = {
      title: 'my-title-title',
      category: 'food',
      contentHTML: '<div>content</div>',
      description: 'content-content-content-content-content',
      pictureUrl: 'https://www.google.com',
      redactor: {
        avatarUrl: 'https://www.google.com',
        biography: 'bio',
        firstName: 'alice',
        lastName: 'smith',
        profession: 'teacher',
      },
      tags: ['school'],
      videoUrl: 'https://www.google.com',
    };

    return app.resolve(CreateArticleHandler).then(handler => {
      return handler.execute(
        new CreateArticleCommand({ ...validArticleOptions, ...options }),
      );
    });
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [dbHandler.rootMongooseTestModule(), ArticlesModule],
  }).compile();

  await module.init();

  return module;
}
