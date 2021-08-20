import { transformAndValidateSync } from 'class-transformer-validator';
import { classToPlain } from 'class-transformer';

import { Article, ArticleCore } from '../models/article_model';
import { CreateArticleInput } from '../../inputs/article_input';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

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
      transformAndValidateSync(ArticleCore, props, getCoreValidationConfig()),
    );
  }
}
