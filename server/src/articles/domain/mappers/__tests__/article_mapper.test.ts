import { ArticleMapper } from '../article_mapper';
import { Article } from '../../models/article_model';
import { RedactorMapper } from '../redactor_mapper';

describe('ArticleMapper', () => {
  describe('#doDomain', () => {
    describe('with minimal props', () => {
      it('creates domain', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
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

        expect(article).toBeInstanceOf(Article);
        expect(article.category.value).toBe('food');
        expect(article.contentHTML).toBe('<div>my-content</div>');
        expect(article.description.value).toBe(
          'my-description-30-characters-lorem-ipsum',
        );
        expect(article.pictureUrl.value).toBe('http://some-page.com/image.png');
        expect(article.tags.value).toEqual([]);
        expect(article.title.value).toBe('my-title-10-characters');
        expect(RedactorMapper.toPersistence(article.redactor)).toEqual({
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
            description: 'my-description-30-characters-lorem-ipsum',
            pictureUrl: 'http://some-page.com/image.png',
            tags: ['behaviour'],
            videoUrl: 'incorrect video url',
            title: 'my-title-10-characters',
            redactor: {
              firstName: 'Alice',
              lastName: 'Smith',
              avatarUrl: 'http://some-page.com/me.png',
              biography: 'beginning',
              profession: 'my-profession',
              shortDescription: 'my-description',
            },
          }),
        ).toThrowError('Url must be valid.');
      });
    });

    describe('with complete props', () => {
      it('creates domain', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          tags: ['behaviour'],
          videoUrl: 'http://some-page.com/video',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
            avatarUrl: 'http://some-page.com/me.png',
            biography: 'beginning',
            profession: 'my-profession',
            shortDescription: 'my-description',
          },
        });

        expect(article).toBeInstanceOf(Article);
        expect(article.category.value).toBe('food');
        expect(article.contentHTML).toBe('<div>my-content</div>');
        expect(article.description.value).toBe(
          'my-description-30-characters-lorem-ipsum',
        );
        expect(article.pictureUrl.value).toBe('http://some-page.com/image.png');
        expect(article.tags.value).toEqual(['behaviour']);
        expect(article.videoUrl.value).toEqual('http://some-page.com/video');
        expect(article.title.value).toBe('my-title-10-characters');
        expect(RedactorMapper.toPersistence(article.redactor)).toEqual({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'http://some-page.com/me.png',
          biography: 'beginning',
          profession: 'my-profession',
          shortDescription: 'my-description',
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
          tags: [],
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
          },
        });

        const articleProps = ArticleMapper.toRaw(article);

        expect(articleProps).toEqual({
          category: 'food',
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
      });
    });

    describe('with complete props', () => {
      it('creates persistence DTO', () => {
        const article = ArticleMapper.toDomain({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          tags: ['behaviour'],
          videoUrl: 'http://some-page.com/video',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
            avatarUrl: 'http://some-page.com/me.png',
            biography: 'beginning',
            profession: 'my-profession',
            shortDescription: 'my-description',
          },
        });

        const articleProps = ArticleMapper.toRaw(article);

        expect(articleProps).toEqual({
          category: 'food',
          contentHTML: '<div>my-content</div>',
          description: 'my-description-30-characters-lorem-ipsum',
          pictureUrl: 'http://some-page.com/image.png',
          tags: ['behaviour'],
          videoUrl: 'http://some-page.com/video',
          title: 'my-title-10-characters',
          redactor: {
            firstName: 'Alice',
            lastName: 'Smith',
            avatarUrl: 'http://some-page.com/me.png',
            biography: 'beginning',
            profession: 'my-profession',
            shortDescription: 'my-description',
          },
        });
      });
    });
  });

  describe('#toPartialDomain', () => {
    it('creates partial domain props', () => {
      const partialProps = ArticleMapper.toPartialDomain({
        category: 'other',
        contentHTML: '<div>updated</div>',
        pictureUrl: 'http://some-page.com/image.png',
        description: 'my-description-30-characters-lorem-ipsum',
        tags: ['behaviour'],
        videoUrl: 'http://some-page.com/video',
        title: 'my-title-10-characters',
      });

      expect(partialProps.category.value).toBe('other');
      expect(partialProps.contentHTML).toBe('<div>updated</div>');
      expect(partialProps.pictureUrl.value).toBe(
        'http://some-page.com/image.png',
      );
      expect(partialProps.description.value).toBe(
        'my-description-30-characters-lorem-ipsum',
      );
      expect(partialProps.tags.value).toEqual(['behaviour']);
      expect(partialProps.videoUrl.value).toBe('http://some-page.com/video');
      expect(partialProps.title.value).toBe('my-title-10-characters');
    });
  });
});
