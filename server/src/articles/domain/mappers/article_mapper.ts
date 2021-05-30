import { Article, ArticleCore } from '../models/article_model';
import { CreateArticleInput } from '../../inputs/article_input';
import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

export class ArticleMapper {
  static toRaw(article: Article): Record<string, any> {
    const props = article.getProps();

    return classToPlain(props, { excludeExtraneousValues: true });
  }

  static toDomain(props: CreateArticleInput): Article {
    return Article.recreate(
      transformAndValidateSync(ArticleCore, props, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );
  }
}
