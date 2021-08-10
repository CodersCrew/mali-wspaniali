import { ArticleMapper } from '../article_mapper';
import { Article } from '../../models/article_model';
import { createValidationObject } from '@app/test/helpers/validation_object_with_message';

describe('ArticleMapper', () => {
  describe('#doDomain', () => {
    describe('with minimal props', () => {
      it('creates domain', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
          },
        });

        expect(article).toBeInstanceOf(Article);
        expect(article.category).toBe('food');
        expect(article.contentHTML).toBe('<div>my-content</div>');
        expect(article.description).toBe(
          'my-description-30-characters-lorem-ipsum',
        );
        expect(article.pictureUrl).toBe('http://some-page.com/image.png');
        expect(article.title).toBe('my-title-10-characters');
        expect(article.redactor).toEqual({
          firstName: 'Alice',
          lastName: 'Smith',
        });
      });
    });

    describe('with incorrent props', () => {
      it('throws an error', () => {
        expect(() =>
          ArticleMapper.toDomain({
            category: 'food',
            contentHTML: '<div>my-content</div>',
            description: 'my-description',
            pictureUrl: 'http://some-page.com/image.png',
            title: 'my-title-10-characters',
            redactor: {
              firstName: 'Alice',
              lastName: 'Smith',
              avatarUrl: 'http://some-page.com/me.png',
              biography: 'beginning',
              profession: 'my-profession',
            },
          }),
        ).toThrow(
          jasmine.arrayContaining([
            createValidationObject('description', {
              length:
                'description must be longer than or equal to 30 characters',
            }),
          ]),
        );
      });
    });

    describe('with complete props', () => {
      it('creates domain', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          videoUrl: 'http://some-page.com/video',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
            avatarUrl: 'http://some-page.com/me.png',
            biography: 'beginning',
            profession: 'my-profession',
          },
        });

        expect(article.category).toBe('food');
        expect(article.contentHTML).toBe('<div>my-content</div>');
        expect(article.description).toBe(
          'my-description-30-characters-lorem-ipsum',
        );
        expect(article.pictureUrl).toBe('http://some-page.com/image.png');
        expect(article.videoUrl).toEqual('http://some-page.com/video');
        expect(article.title).toBe('my-title-10-characters');
        expect(article.redactor).toEqual({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'http://some-page.com/me.png',
          biography: 'beginning',
          profession: 'my-profession',
        });
      });
    });
  });

  describe('#toRaw', () => {
    describe('with minimal props', () => {
      it('creates persistence DTO', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
          },
        });

        const articleProps = ArticleMapper.toPlain(article);

        expect(articleProps).toEqual(
          jasmine.objectContaining({
            category: 'food',
            contentHTML: '<div>my-content</div>',
            description: 'my-description-30-characters-lorem-ipsum',
            pictureUrl: 'http://some-page.com/image.png',
            title: 'my-title-10-characters',
            redactor: {
              firstName: 'Alice',
              lastName: 'Smith',
            },
          }),
        );
      });
    });

    describe('with complete props', () => {
      it('creates persistence DTO', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          videoUrl: 'http://some-page.com/video',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
            avatarUrl: 'http://some-page.com/me.png',
            biography: 'beginning',
            profession: 'my-profession',
          },
        });

        const articleProps = ArticleMapper.toPlain(article);

        expect(articleProps).toEqual(
          jasmine.objectContaining({
            category: 'food',
            contentHTML: '<div>my-content</div>',
            description: 'my-description-30-characters-lorem-ipsum',
            pictureUrl: 'http://some-page.com/image.png',
            videoUrl: 'http://some-page.com/video',
            title: 'my-title-10-characters',
            redactor: {
              firstName: 'Alice',
              lastName: 'Smith',
              avatarUrl: 'http://some-page.com/me.png',
              biography: 'beginning',
              profession: 'my-profession',
            },
          }),
        );
      });
    });
  });
});
