import { Article, ArticleCore } from '../models/article_model';
import { CreateArticleInput } from '../../inputs/article_input';
import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

export class ArticleMapper {
  static toPlain(article: Article): ArticleCore {
    const props = article.getProps();

    return classToPlain(props, {
      excludeExtraneousValues: true,
    }) as ArticleCore;
  }

  static toDomain(
    props: CreateArticleInput,
    options: { isNew: boolean } = { isNew: false },
  ): Article {
    const createArticle = options.isNew ? Article.create : Article.recreate;

    return createArticle(
      transformAndValidateSync(ArticleCore, props, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );
  }
}
