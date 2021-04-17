import { Test, TestingModule } from '@nestjs/testing';
import * as dbHandler from '@app/db_handler';
import { CreateArticleHandler } from '@articles/domain/commands/handlers/create_article_handler';
import { CreateArticleCommand } from '@articles/domain/commands/impl';
import { ArticlesModule } from '@articles/articles_module';
import { ArticleInput } from '@articles/inputs/article_input';
import { Article } from '@app/articles/domain/models/article_model';
import { TextLength } from '../../../../../shared/domain/text_length';
import {
  createParent,
  getAllArticles,
  getNotificationsForUser,
} from '@app/test/helpers/app_mock';
import { User } from '@users/domain/models/user_model';
import waitForExpect from 'wait-for-expect';

jest.setTimeout(10000);

describe('CreateArticleHandler', () => {
  let app: TestingModule;

  afterEach(async () => {
    await app.close();
  });

  beforeEach(async () => {
    app = await setup();

    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      it('returns article instance', async () => {
        const article = await createArticleWith();

        expect(article).toBeInstanceOf(Article);
        expect(article.id).toBeDefined();
        expect(article.title).toBeInstanceOf(TextLength);
        expect(article.title.value).toBe('my-title-title');
        expect(article.date).toBeInstanceOf(Date);
        expect(article.contentHTML).toBe('<div>content</div>');
      });

      it('persists article', async () => {
        await createArticleWith();

        await waitForExpect(async () => {
          const articles = await getAllArticles();

          expect(articles.length).toBe(1);
          expect(articles[0].title.value).toBe('my-title-title');
        });
      });
    });
  });

  function createArticleWith(options: Partial<ArticleInput> = {}) {
    const validArticleOptions: ArticleInput = {
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

function awaitForResponse(timeout: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
