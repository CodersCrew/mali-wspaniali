import { ArticleMapper } from '../../mappers/article_mapper';
import { createValidationObject } from '../../../../test/helpers/validation_object_with_message';

describe('Article', () => {
  describe('when created', () => {
    describe('with invalid category', () => {
      it('throws an error', () => {
        expect(() =>
          ArticleMapper.toDomain({
            category: 'other1' as any,
            contentHTML: '<div>my-content</div>',
            description: 'my-description-30-characters-lorem-ipsum',
            pictureUrl: 'http://some-page.com/image.png',
            tags: [],
            title: 'my-title-10-characters',
            redactor: {
              firstName: 'Alice',
              lastName: 'Smith',
            },
          }),
        ).toThrow(
          jasmine.arrayContaining([
            createValidationObject('category', {
              isIn:
                'category must be one of the following values: food,activity,emotions,other',
            }),
          ]),
        );
      });
    });
  });

  describe('#update', () => {
    it('updates Article', () => {
      const article = ArticleMapper.toDomain({
        category: 'other',
        contentHTML: '<div>my-content</div>',
        description: 'my-description-30-characters-lorem-ipsum',
        pictureUrl: 'http://some-page.com/image.png',
        tags: [],
        title: 'my-title-10-characters',
        redactor: {
          firstName: 'Alice',
          lastName: 'Smith',
        },
      });

      expect(article.category).toBe('other');
      expect(article.modifiedAt).toBe(null);

      article.update({ category: 'food' });

      expect(article.category).toBe('food');
      expect(article.modifiedAt).toBeInstanceOf(Date);
    });
  });

  describe('if update is incorrect', () => {
    it('throws an error', () => {
      const article = ArticleMapper.toDomain({
        category: 'other',
        contentHTML: '<div>my-content</div>',
        description: 'my-description-30-characters-lorem-ipsum',
        pictureUrl: 'http://some-page.com/image.png',
        tags: [],
        title: 'my-title-10-characters',
        redactor: {
          firstName: 'Alice',
          lastName: 'Smith',
        },
      });

      expect(article.title).toBe('my-title-10-characters');

      expect(() => article.update({ description: 'too-short' })).toThrow(
        jasmine.arrayContaining([
          createValidationObject('description', {
            length: 'description must be longer than or equal to 30 characters',
          }),
        ]),
      );
    });
  });
});
