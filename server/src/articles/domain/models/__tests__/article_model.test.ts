import { ArticleMapper } from '../../mappers/article_mapper';
describe('Article', () => {
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

      expect(article.category.value).toBe('other');

      article.update({ category: 'food' });

      expect(article.category.value).toBe('food');
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

      expect(article.title.value).toBe('my-title-10-characters');

      expect(() => article.update({ description: 'too-short' })).toThrowError(
        'Text in field "description" must have valid length. Min: 30, Max: 300',
      );
    });
  });
});
